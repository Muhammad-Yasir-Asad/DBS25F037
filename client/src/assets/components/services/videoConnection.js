import { HubConnectionBuilder } from '@microsoft/signalr';

const videoConnection = new HubConnectionBuilder()
  .withUrl("https://localhost:7067/videoHub")
  .withAutomaticReconnect()
  .build();

let localStream;
let peerConnection;

const startCall = async (remoteUser) => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

  peerConnection = new RTCPeerConnection();

  localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      videoConnection.invoke("SendIceCandidate", remoteUser, JSON.stringify(event.candidate));
    }
  };

  peerConnection.ontrack = event => {
    const remoteVideo = document.getElementById("remoteVideo");
    if (remoteVideo && remoteVideo.srcObject !== event.streams[0]) {
      remoteVideo.srcObject = event.streams[0];
    }
  };

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  videoConnection.invoke("SendOffer", remoteUser, JSON.stringify(offer));
};

videoConnection.on("ReceiveOffer", async (offer, remoteUser) => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  peerConnection = new RTCPeerConnection();

  localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      videoConnection.invoke("SendIceCandidate", remoteUser, JSON.stringify(event.candidate));
    }
  };

  peerConnection.ontrack = event => {
    const remoteVideo = document.getElementById("remoteVideo");
    if (remoteVideo && remoteVideo.srcObject !== event.streams[0]) {
      remoteVideo.srcObject = event.streams[0];
    }
  };

  await peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(offer)));
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  videoConnection.invoke("SendAnswer", remoteUser, JSON.stringify(answer));
});

videoConnection.on("ReceiveAnswer", async (answer) => {
  await peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(answer)));
});

videoConnection.on("ReceiveIceCandidate", async (candidate) => {
  await peerConnection.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
});

export { startCall, videoConnection };
