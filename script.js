const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

img.onload = () => {
  setCanvasSize();
  drawImage();
};

function setCanvasSize() {
  const size = document.getElementById("photoSize").value;

  if (size === "3.5x4.5") {
    canvas.width = 413;
    canvas.height = 531;
  } else if (size === "2x2") {
    canvas.width = 600;
    canvas.height = 600;
  } else {
    canvas.width = img.width;
    canvas.height = img.height;
  }
}

function drawImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  drawText();
}

function drawText() {
  const name = document.getElementById("nameText").value;
  const date = document.getElementById("dateText").value;
  const color = document.getElementById("textColor").value;
  const size = document.getElementById("fontSize").value;

  ctx.fillStyle = color;
  ctx.font = `${size}px Arial`;
  ctx.textAlign = "center";

  ctx.fillText(name, canvas.width / 2, canvas.height - 40);
  ctx.fillText(date, canvas.width / 2, canvas.height - 15);
}

document.querySelectorAll("input, select").forEach(el => {
  el.addEventListener("input", drawImage);
});

function downloadImage() {
  const link = document.createElement("a");
  link.download = "pi7-photo.png";
  link.href = canvas.toDataURL();
  link.click();
}
