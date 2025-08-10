import { FaceDetection } from "@mediapipe/face_detection";
import { drawConnectors } from "@mediapipe/drawing_utils";
import { emitter } from "./events.js";

export function initFaceDetector(videoElement, canvasElement) {
  const ctx = canvasElement.getContext("2d");

  const faceDetection = new FaceDetection({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
  });

  faceDetection.setOptions({
    model: "short", // mais rápido
    minDetectionConfidence: 0.5,
  });

  faceDetection.onResults((results) => {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.detections.length > 0) {
      emitter.emit("face_detected", results.detections);
    } else {
      emitter.emit("no_face_detected");
    }
  });

  emitter.on("frame", async () => {
    await faceDetection.send({ image: videoElement });
  });
}
