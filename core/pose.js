import { Pose } from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { emitter } from "../events.js";

export function initPoseDetector(videoElement, canvasElement) {
  const ctx = canvasElement.getContext("2d");

  const pose = new Pose({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
  });

  pose.setOptions({
    modelComplexity: 0, // mais rápido
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  pose.onResults((results) => {
    ctx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.poseLandmarks && results.poseLandmarks.length > 0) {
      emitter.emit("pose_detected", results.poseLandmarks);
    } else {
      emitter.emit("no_pose_detected");
    }
  });

  emitter.on("frame", async () => {
    await pose.send({ image: videoElement });
  });
}
