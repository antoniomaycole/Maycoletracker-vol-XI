import React, { useEffect } from 'react';

const CameraCapture = () => {
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        const video = document.querySelector('video');
        if (video) video.srcObject = stream;
      })
      .catch(err => console.error('Camera access denied', err));
  }, []);

  return (
    <div>
      <h1>Camera Module</h1>
      <video autoPlay width="400" />
    </div>
  );
};

export default CameraCapture;