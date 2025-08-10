import { emitter } from "./events.js";

// Som de alerta
const audio = new Audio("alert.mp3"); // você pode colocar qualquer som na raiz do projeto

// Tocar som quando rosto some
emitter.on("no_face_detected", () => {
  console.log("[AÇÃO] Ninguém na frente da câmera!");
  audio.play().catch(() => {}); // evita erro se som for bloqueado pelo navegador
});

// Logar e parar som quando rosto aparece
emitter.on("face_detected", () => {
  console.log("[AÇÃO] Rosto detectado.");
  audio.pause();
  audio.currentTime = 0;
});
