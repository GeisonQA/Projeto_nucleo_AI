import { Camera } from "@mediapipe/camera_utils";

export function initCamera(videoElement, onFrame) {
  const camera = new Camera(videoElement, {
    onFrame,
    facingMode: "user",
    width: 640,
    height: 480,
  });
  camera.start();
}
