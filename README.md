<h1 align="center">
  Message Peer Connection
  <br />
</h1>

### WebRTC Peer connection abstraction for messages exchanges.

## Installation


```console
$ yarn add message-peer-connection
```
or
```console
$ npm i message-peer-connection
```

## Usage

```js
import PeerConnection from 'message-peer-connection'

const onClose = () => console.log('Connecion Closed')
const onCreateOffer = (event, peerConnection) => sendOfferToPeer(peerConnection)
const onOpen = () => console.log('Connection Stablished')
const onSetOffer = (event, peerConnection) => sendAnswerToPeer(peerConnection)

const peerConnection = PeerConnection({
  onOpen,
  onClose,
  onCreateOffer,
  onSetOffer,
})
```

## APIs

### PeerConnection

```js
PeerConnection({
    pc,
    onClose,
    onCreateOffer,
    onError,
    onMessage,
    onOpen,
    onSetAnswer,
    onSetOffer,
    ...state,
})
```

Param | Meaning
---|---
`pc` | [RTCPeerConnection](https://developer.mozilla.org/pt-BR/docs/Web/API/RTCPeerConnection) instance, default value is `new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] })`.
`onClose` | [onClose](#onClose).
`onCreateOffer` | [onCreateOffer](#onCreateOffer).
`onError` | [onError](#onError).
`onMessage` | [onMessage](#onMessage).
`onOpen` | [onOpen](#onOpen).
`onSetOffer` | [onSetOffer](#onSetOffer).
`...state` | Any state data.

Function | Meaning | Specification
---|---|---
`close` | Closes the connection. [Close](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/close) abstraction. | () -> PeerConnection.
`createOffer` | [RTCPeerConnection createOffer](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer) abstraction | () -> PeerConnection
`getLocalDescriptionSDP` | Retuns the [RTCPeerConnection](https://developer.mozilla.org/pt-BR/docs/Web/API/RTCPeerConnection)'s [localDescription](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/setLocalDescription)'s [SDP](https://developer.mozilla.org/en-US/docs/Glossary/SDP) | () -> [SDP](https://developer.mozilla.org/en-US/docs/Glossary/SDP)
`getState` | Returns the PeerConnection state. | () -> Object
`sendMessage` | Adds a title prop to the data object, stringifies it and calls `sendPlainTextMessage`. | (title: string, data: object) -> PeerConnection
`sendPlainTextMessage` | [channel](https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel/send) abstraction | message: string -> PeerConnection
`setAnswer` | [setRemoteDescription](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/setRemoteDescription) abstraction that sets an [RTCSessionDescription](https://developer.mozilla.org/en-US/docs/Web/API/RTCSessionDescription) answer. | answer: string -> PeerConnection
`setOffer` | [setRemoteDescription](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/setRemoteDescription) abstraction that sets an [RTCSessionDescription](https://developer.mozilla.org/en-US/docs/Web/API/RTCSessionDescription) offer and creates an answer. | string -> PeerConnection
`setPC` | Sets the [RTCPeerConnection](https://developer.mozilla.org/pt-BR/docs/Web/API/RTCPeerConnection) instance that will be used | pc: [RTCPeerConnection](https://developer.mozilla.org/pt-BR/docs/Web/API/RTCPeerConnection) -> PeerConnection
`setState` | Adds new state values. | newStateValues: object -> PeerConnection
`updateOnClose` | Updates the [onClose](#onClose) listener | onClose: function -> PeerConnection
`updateOnCreateOffer` | Updates the [onCreateOffer](#onCreateOffer) listener | onCreateOffer: function -> PeerConnection
`updateOnError` | Updates the [onError](#onError) listener | onError: function -> PeerConnection
`updateOnMessage` | Updates the [onMessage](#onMessage) listener | onMessage: function -> PeerConnection
`updateOnOpen` | Updates the [onOpen](#onOpen) listener | onOpen: function -> PeerConnection
`updateOnSetOffer` | Updates the [onSetOffer](#onSetOffer) listener | onSetOffer: function -> PeerConnection

## Listeners

### onClose

Listener function executed when the connection closes, it receives two arguments [oniceconnectionstatechange Event](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/oniceconnectionstatechange) and the `PeerConnection` instance.

### onCreateOffer

Listener function executed when an offer is created, it receives two arguments [onicecandidate Event](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicecandidate) and the `PeerConnection` instance.

### onError

Listener function executed when an error is catch while trying to create or set an offer or set an answer it receives two arguments `Event` and the `PeerConnection` instance.

### onMessage

Listener function executed when a message is receive, it receives two arguments [onmessage Event](https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel/onmessage) and the `PeerConnection` instance.

### onOpen

Listener function executed when the connection is stablished, it receives two arguments [onopen Event](https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel/onopen) and the `PeerConnection` instance.

### onSetOffer

Listener function executed when an offer is set, it receives two arguments [onicecandidate Event](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onicecandidate) and the `PeerConnection` instance.

## TODO

- [x] Readme
- [ ] Example folder
- [ ] Tests


## References

https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/