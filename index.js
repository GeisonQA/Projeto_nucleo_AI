import { initCamera } from "./core/camera.js";
import { initFaceDetector } from "./core/detectors.js";
import "./core/actions.js"; // 🔹 Importa ações para rodarem junto
import { emitter } from "./core/events.js";

const video = document.getElementById("video");
const canvas = document.getElementById("output");

// Inicia a câmera
initCamera(video, () => {
  emitter.emit("frame");
});

// Inicia o detector
initFaceDetector(video, canvas);
