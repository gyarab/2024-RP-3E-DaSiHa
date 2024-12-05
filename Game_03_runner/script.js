const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

import { Sprite } from '../Monkey-Engine/Sprite.js';

const s1 = new Sprite(0, 0, 100, 100);

s1.render(ctx);


//poynamkas