const videoGrid = document.getElementById('video-grid');
//const myVideo = document.createElement('video');
const peers = {};
//myVideo.muted = true;

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    const myPeer = new Peer(undefined, {
      host: '/',
      port: '3002',
    });

    //addVideoStream(myVideo, stream);

    myPeer.on('call', (call) => {
      console.log('peer call');
      call.answer(stream);
      const video = document.createElement('video');
      call.on('stream', (userVideoStream) => {
        console.log('in call on stream');
        addVideoStream(video, userVideoStream);
      });
    });

    myPeer.on('open', (id) => {
      console.log('peer open');
      const wss = io('http://localhost:3001', {
        auth: {
          token: document.cookie.split('=')[1],
        },
      });

      wss.on('join', (userName) => {
        console.log(userName + ' join');
        connectToNewUser(id, stream);
      });

      wss.on('leave', (userName) => {
        console.log(userName + ' leave');
        if (peers[id]) peers[id].close();
      });
    });

    function connectToNewUser(userId, stream) {
      const call = myPeer.call(userId, stream);
      const video = document.createElement('video');
      call.on('stream', (userVideoStream) => {
        console.log('in call stream');
        addVideoStream(video, userVideoStream);
      });
      call.on('close', () => {
        console.log('in call close');
        video.remove();
      });

      peers[userId] = call;
    }

    function addVideoStream(video, stream) {
      console.log(stream);
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        console.log('media loaded');
        video.play();
      });
      videoGrid.append(video);
    }
  });

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTI3OWQ1MDVkNjY5MmRjMjU3MjY3NjUiLCJpYXQiOjE2MzA4MzA0NDl9.-46tW2zkggPOUaetErMae0KurLJCS5cb5JDw_6EjziU

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTI3OWQ1MDVkNjY5MmRjMjU3MjY3NjQiLCJpYXQiOjE2MzA4MzAyMTF9.nek6ohsEQDFM_MxV5JqFrASCcFQgSy5egaN07gDrO2s
