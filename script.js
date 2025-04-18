function generatePoster() {
  const photoInput = document.getElementById("photoUpload");
  const personName = document.getElementById("personName").value;

  const photoFile = photoInput.files[0];
  if (!photoFile || !personName.trim()) {
    alert("Please upload your photo and enter your name.");
    return;
  }

  if (!isTemplateLoaded) {
    alert("Template is still loading. Please wait a moment.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const photoImg = new Image();
    photoImg.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set the maximum size for the photo to fit into the blank area
      const maxWidth = 700;  // Set your desired maximum width
      const maxHeight = 1000; // Set your desired maximum height
      let width = photoImg.width;
      let height = photoImg.height;

      // Scale the photo to fit within the maximum dimensions
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      // Center the resized photo on the canvas
      const offsetX = (canvas.width - width) / 2;
      const offsetY = (canvas.height - height) / 2;
      ctx.drawImage(photoImg, offsetX, offsetY, width, height);

      // Draw the frame on top
      ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

      // Draw the name 
      ctx.font = "bold 46px 'Orbitron'";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.fillText(personName, canvas.width / 2, 1020);
    };
    photoImg.src = e.target.result;
  };
  reader.readAsDataURL(photoFile);
}
