const gameDiv = document.getElementById('game');
const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');
    const image = new Image();

function sipecka() {
    image.src = 'sipecka.png';
    image.onload = () => {
        context.drawImage(image, 200, 280, 100, 200);
    };
}

window.onload = sipecka;

function cudla() {
}