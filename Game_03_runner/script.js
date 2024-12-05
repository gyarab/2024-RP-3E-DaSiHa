const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

import { Sprite }           from '../Monkey-Engine/Sprite.js';
import { CharacterSprite1 } from '../Monkey-Engine/CharacterSprite1.js';

const pozadi = new Sprite(0, 0, 1080, 720);
pozadi.loadImg("hra.jpg");

const character = new Sprite(100, 500, 120, 100);

pozadi.render(ctx);
character.render(ctx);