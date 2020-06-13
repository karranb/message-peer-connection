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
PeerConnection
({
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
`pc` | todo
`onClose` | todo
`onCreateOffer` | todo
`onError` | todo
`onMessage` | todo
`onOpen` | todo
`onSetOffer` | todo
`...state` | todo

Function | Meaning | Return
---|---|---
`close` | todo | todo
`createOffer` | todo | todo
`getLocalDescriptionSDP` | todo | todo
`getState` | todo | todo
`sendMessage` | todo | todo
`sendPlainTextMessage` | todo | todo
`setAnswer` | todo | todo
`setOffer` | todo | todo
`setPC` | todo | todo
`setState` | todo | todo
`updateOnClose` | todo | todo
`updateOnCreateOffer` | todo | todo
`updateOnError` | todo | todo
`updateOnMessage` | todo | todo
`updateOnOpen` | todo | todo
`updateOnSetOffer` | todo | todo

## TODO

- [ ] Readme
- [ ] Example file


## References

https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/