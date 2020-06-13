const DEFAULT_WEBRTC_SERVER = 'stun:stun.l.google.com:19302'
const DEFAULT_ICE_SERVER = { urls: DEFAULT_WEBRTC_SERVER }

const PeerConnection = (config = {}) => {
  let state = {
    pc: new RTCPeerConnection({ iceServers: [DEFAULT_ICE_SERVER] }),
    ...config,
  }

  const getState = () => state

  const setState = newState => {
    state = {
      ...state,
      ...newState,
    }
  }

  const functions = () => {
    const updateListener = (listenerName, fn, webrtcListenerName) => {
      const { channel } = state
      const listener = e => fn(e, functions())
      if (webrtcListenerName && channel) {
        channel[webrtcListenerName] = listener
      }
      setState({ [listenerName]: listener })
      return functions()
    }

    const updateOnOpen = fn => updateListener('onOpen', fn, 'onopen')
    const updateOnMessage = fn => updateListener('onMessage', fn, 'onmessage')
    const updateOnClose = fn => updateListener('onClose', fn)
    const updateOnSetOffer = fn => updateListener('onSetOffer', fn)
    const updateOnCreateOffer = fn => updateListener('onCreateOffer', fn)
    const updateOnError = fn => updateListener('onError', fn)

    const updateListeners = () => {
      const { onOpen, onMessage } = state
      updateOnOpen(onOpen)
      updateOnMessage(onMessage)
    }

    const setPC = pc => {
      // eslint-disable-next-line no-param-reassign
      pc.ondatachannel = ({ channel }) => {
        setState({ channel })
        updateListeners()
      }

      // eslint-disable-next-line no-param-reassign
      pc.oniceconnectionstatechange = e => {
        if (pc.iceConnectionState !== 'disconnected') {
          return
        }
        const { onClose } = state
        if (onClose) {
          onClose(e)
        }
      }
      return functions()
    }

    const createOffer = () => {
      const { pc } = state
      const channel = pc.createDataChannel('chat')
      setState({ channel })
      updateListeners()

      pc.createOffer()
        .then(d => pc.setLocalDescription(d))
        .catch(e => {
          const { onError } = state
          onError(e)
        })

      pc.onicecandidate = e => {
        const { onCreateOffer } = state
        if (onCreateOffer) {
          onCreateOffer(e)
        }
      }
      return functions()
    }

    const setAnswer = answer => {
      const { pc } = state
      const desc = new RTCSessionDescription({ type: 'answer', sdp: answer })
      pc.setRemoteDescription(desc).catch(e => {
        const { onError } = state
        onError(e)
      })
      return functions()
    }

    const setOffer = offer => {
      const { pc } = state
      const desc = new RTCSessionDescription({ type: 'offer', sdp: offer })
      pc.setRemoteDescription(desc)
        .then(() => pc.createAnswer())
        .then(d => pc.setLocalDescription(d))
        .catch(e => {
          const { onError } = state
          onError(e)
        })

      pc.onicecandidate = e => {
        const { onSetOffer } = state
        if (onSetOffer) {
          onSetOffer(e)
        }
      }
      return functions()
    }

    const close = () => {
      const { pc } = state
      pc.close()
      return functions()
    }

    const sendPlainTextMessage = message => {
      const { channel } = state
      channel.send(message)
      return functions()
    }

    const sendMessage = (title, messageObject = {}) =>
      sendPlainTextMessage(JSON.stringify({ title, ...messageObject }))

    const updateState = newState => {
      setState(newState)
      return functions()
    }

    const getLocalDescriptionSDP = () => state.pc.localDescription.sdp

    return {
      close,
      getLocalDescriptionSDP,
      setPC,
      getState,
      setState: updateState,
      createOffer,
      setOffer,
      setAnswer,
      sendMessage,
      sendPlainTextMessage,
      updateOnClose,
      updateOnError,
      updateOnMessage,
      updateOnOpen,
      updateOnSetOffer,
      updateOnCreateOffer,
    }
  }
  return functions().setPC(state.pc)
}

export default PeerConnection
