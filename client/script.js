const video = document.getElementById("videoCapture");
const startButton = document.getElementById("btnIniciar");
let countMatcher = 0;

startButton.onclick = () => {
  Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
  ]).then(startVideo());
};
navigator.mediaDevices.getUserMedia
const startVideo = async () => {
  await navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
};

const stopVideo = async () => {
  await navigator.getUserMedia(
    { video: {} },
    () => (video.srcObject = null),
    (err) => console.error(err)
  );
};

const startFacialRecognition = async () => {
  const labeledFaceDescriptors = await loadLabeledImages();
  const faceMatcher = await new faceapi.FaceMatcher(labeledFaceDescriptors, 0.7);
  const canvas = await faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  await faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptors();
    const resizedDetections = await faceapi.resizeResults(
      detections,
      displaySize
    );
    await canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    await faceapi.draw.drawDetections(canvas, resizedDetections);
    const results = await resizedDetections.map((d) =>
      faceMatcher.findBestMatch(d.descriptor)
    );
    await results.forEach((result, i) => {
      console.log(result.label);
      countMatcher += 1;
      if (countMatcher == 10) {
        stopVideo();
        document.body.removeChild(canvas);
      }
      const box = resizedDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: result.toString(),
      });
      drawBox.draw(canvas);
    });
  }, 100);
}

video.addEventListener("playing", startFacialRecognition);

const loadLabeledImages = async () => {
  const labels = ["Gabriel Lingan"];
  return await Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 3; i++) {
        const img = await faceapi.fetchImage(
          `./labeled-images/${label}/${i}.jpg`
        );
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}
