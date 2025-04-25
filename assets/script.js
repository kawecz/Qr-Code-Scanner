const validCodes = {
  "bookqr://test123":
    "https://www.youtube.com/live/sF80I-TQiW0?si=s8HRY07PwFlGRf22",
};

function isValidBookQR(text) {
  return text.startsWith("bookqr://") && validCodes[text];
}

function redirectToVideo(code) {
  const path = validCodes[code];
  if (path) {
    window.location.href = path;
  }
}

// Iniciar a leitura do QR Code ao clicar no botão
document
  .getElementById("start-camera-btn")
  .addEventListener("click", function () {
    document.getElementById("reader").classList.remove("hidden"); // Torna a área de leitura visível
    startCamera(); // Inicia a câmera
  });

const html5QrCode = new Html5Qrcode("reader");

function startCamera() {
  html5QrCode
    .start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      (decodedText, decodedResult) => {
        html5QrCode.stop();
        if (isValidBookQR(decodedText)) {
          document.getElementById("result").textContent =
            `Recognized: ${decodedText}`;
          document.getElementById("result").classList.remove("hidden");
          redirectToVideo(decodedText);
        } else {
          document.getElementById("error").textContent =
            "Invalid or unrecognized code.";
          document.getElementById("error").classList.remove("hidden");
        }
      },
      (errorMessage) => {
        // Ignore errors, but você pode logar se necessário
      },
    )
    .catch((err) => {
      document.getElementById("error").textContent = `Camera error: ${err}`;
      document.getElementById("error").classList.remove("hidden");
    });
}
