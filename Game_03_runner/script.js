const canvas = document.createElement('canvas');
canvas.width = 700;
canvas.height = 600;

document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
const img = new Image();

img.src = 'hra.jpg';

img.onload = function() {
    ctx.drawImage(img, 0, 0, 700, 600);
};
//poynamkas