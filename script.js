const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let images = [];

document.getElementById("upload").addEventListener("change", (e) => {
  images = [];
  for (let file of e.target.files) {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    images.push(img);
  }
});

function generateA4() {
  const [w, h] = document.getElementById("size").value.split("x").map(Number);

  // A4 at 300 DPI
  canvas.width = 2480;
  canvas.height = 3508;

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let x = 50, y = 50;
  const gap = 30;

  const name = document.getElementById("nameText").value;
  const date = document.getElementById("dateText").value;
  const fontSize = document.getElementById("fontSize").value;
  const color = document.getElementById("textColor").value;

  images.forEach(img => {
    if (x + w > canvas.width) {
      x = 50;
      y += h + 60;
    }

    ctx.drawImage(img, x, y, w, h);

    ctx.fillStyle = color;
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText(name, x + w / 2, y + h - 25);
    ctx.fillText(date, x + w / 2, y + h - 5);

    x += w + gap;
  });
}

function download() {
  const link = document.createElement("a");
  link.download = "pi7-a4-photos.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
