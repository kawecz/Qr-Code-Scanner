const validCodes = {
        "bookqr://test123": "https://www.youtube.com/live/sF80I-TQiW0?si=s8HRY07PwFlGRf22"
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

  const html5QrCode = new Html5Qrcode("reader");

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText, decodedResult) => {
      html5QrCode.stop();
      if (isValidBookQR(decodedText)) {
        document.getElementById("result").textContent = `Recognized: ${decodedText}`;
        document.getElementById("result").classList.remove("hidden");
        redirectToVideo(decodedText);
      } else {
        document.getElementById("error").textContent = "Invalid or unrecognized code.";
        document.getElementById("error").classList.remove("hidden");
      }
    },
    (errorMessage) => {
      // Ignore errors
    }
  ).catch((err) => {
    document.getElementById("error").textContent = `Camera error: ${err}`;
    document.getElementById("error").classList.remove("hidden");
  });