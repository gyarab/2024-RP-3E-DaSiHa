import { Sprite } from "./Sprite.js";

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
const LoadableSprites = [
    "/pexeso_sprites/s1.png",
    "/pexeso_sprites/s2.png",
    "/pexeso_sprites/s3.png",
    "/pexeso_sprites/s4.png",
    "/pexeso_sprites/s5.png",
    "/pexeso_sprites/s6.png",
    "/pexeso_sprites/s7.png",
    "/pexeso_sprites/s8.png",
    "/pexeso_sprites/s9.png",
    "/pexeso_sprites/s10.png",
    "/pexeso_sprites/s11.png",
    "/pexeso_sprites/s12.png",
    "/pexeso_sprites/s13.png",
    "/pexeso_sprites/s14.png",
    "/pexeso_sprites/s15.png",
    "/pexeso_sprites/s16.png",
    "/pexeso_sprites/s17.png",
    "/pexeso_sprites/s18.png",
    "/pexeso_sprites/s19.png",
    "/pexeso_sprites/s20.png",
    "/pexeso_sprites/s21.png",
    "/pexeso_sprites/s22.png",
    "/pexeso_sprites/s23.png",
    "/pexeso_sprites/s24.png",
    "/pexeso_sprites/s25.png",
    "/pexeso_sprites/s26.png",
    "/pexeso_sprites/s27.png",
    "/pexeso_sprites/s28.png",
    "/pexeso_sprites/s29.png",
    "/pexeso_sprites/s30.png"
];

/*
-----------Game-Section-------------
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 720, 720);
---------Settings-Section-----------
ctx.fillStyle = 'grey';
ctx.fillRect(720, 0, 1080 - 720, 720);
*/

class Pexeso {

    constructor(rows, columns, spritesPaths = []) {
        this._rows    = rows;
        this._columns = columns;
        
        this.sprites = spritesPaths;    //paths to imgs for cards
        this.currentPlayer = 1;         //could be boolean if only two players
        this.turnsPlayed   = 0;
        this.cards         = [];        
        this.flippedCards  = [];
        this.locked = false;            //

        this.createCards();
        this.button1 = new Button(840, 520, 120 ,60 ,null,"restart");
        this.button5 = new Button(840, 420, 120 ,60 ,null,"24x24");
        this.button4 = new Button(840, 320, 120 ,60 ,null,"10x10");
        this.button3 = new Button(840, 220, 120 ,60 ,null,"8x8");
        this.button2 = new Button(840, 120, 120 ,60 ,null,"4x4");

    }
    //používá se v případě že je málo spritů
    getRandomColor() {
        const R = Math.floor(Math.random() * 256);
        const G = Math.floor(Math.random() * 256);
        const B = Math.floor(Math.random() * 256);
        return `rgb(${R}, ${G}, ${B})`;
    }
    //vytvoří obrázky
    createCards() {
        const totalCards = this._rows * this._columns;
        const pairs = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
        const numbers = [...pairs, ...pairs];
        this.shuffle(numbers);

        const colorMap = new Map();
        const spriteMap = new Map();
        const colors = Array.from({ length: totalCards / 2 }, () => this.getRandomColor());

        for (let i = 0; i < totalCards; i++) {
            const cardNumber = numbers[i];

            if (!colorMap.has(cardNumber)) {
                colorMap.set(cardNumber, colors[cardNumber - 1]);
            }

            if (!spriteMap.has(cardNumber) && this.sprites[cardNumber - 1]) {
                spriteMap.set(cardNumber, this.sprites[cardNumber - 1]);
            }

            const color = colorMap.get(cardNumber);
            const sprite = spriteMap.get(cardNumber);
            const card = new Card(cardNumber, this, i, color, sprite);

            this.cards.push(card);
        }
    } 
    //zamíchá pozice pole
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    //render všech karet
    renderCards() {
        this.cards.forEach(card => card.render(ctx));
    }
    //otočí kartu podle x , y na canvasu
    flipCardAt(x, y) {
        if (this.locked) return;
        for (const card of this.cards) {
            if (card.containsPoint(x, y) && !card.isRevealed) {
                card.isRevealed = true;
                this.flippedCards.push(card);
                card.flipColor = this.currentPlayer;
                this.renderCards();

                if (this.flippedCards.length === 2) {
                    this.locked = true;  // zamkne možnost dalších tahů
                    this.checkMatch();
                }
                break;
            }
        }
    }
    //zkontroluje dvojci odkrytých karet a řeší logiku tahů
    checkMatch() {
        const [card1, card2] = this.flippedCards;

        if (card1.number === card2.number) {
            this.flippedCards = [];
            this.locked = false;  
        } else {
            setTimeout(() => {
                card1.isRevealed = false;
                card2.isRevealed = false;
                this.flippedCards = [];
                this.switchTurn();
                this.locked = false;  
                this.renderCards();
                this.turnsPlayed += 1;
                this.updateGreyPanel(ctx)
            }, 1000);
        }
    }
    //přepíná mezi dvěma hráči
    switchTurn() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }
    //updatuje okolí karet 
    updateGreyPanel(ctx) {
        // Clear the previous text
        ctx.fillStyle = 'grey';
        ctx.fillRect(720, 0, 1080 - 720, 720);
        // Display player and turn information
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`Player ${this.currentPlayer}'s Turn`, 820, 50);
        ctx.fillText(`Turns Played: ${this.turnsPlayed}`, 820, 100);
        this.button1.render(ctx);
        this.button2.render(ctx);
        this.button3.render(ctx);
        this.button4.render(ctx);
        this.button5.render(ctx);

    }
}

class Card extends Sprite {
    constructor(number, pexeso, index, color, sprite = null) {
        const width  = 720 / pexeso._columns;
        const height = 720 / pexeso._rows;

        const x =           (index % pexeso._columns) * width;
        const y = Math.floor(index / pexeso._columns) * height;

        super(x, y, width, height, sprite, color);
        this.number = number;
        this.isRevealed = false;
        this.flipColor = 0;
    }
    //rendruje kartu
    render(ctx) {
        if (this.isRevealed) {
            if (this.flippedByPlayer === 1) {
                ctx.fillStyle = 'green';
                ctx.fillRect(this._x, this._y, this._width, this._height);
            }
            if (this.flippedByPlayer === 2) {
                ctx.fillStyle = 'red';
                ctx.fillRect(this._x, this._y, this._width, this._height);
            }
            super.render(ctx);
        } else {
            ctx.fillStyle = 'black';
            ctx.fillRect(this._x, this._y, this._width, this._height);
            ctx.fillStyle = 'white';
            ctx.fillRect(this._x + 2, this._y + 2, this._width - 4, this._height - 4);
        }
    }
    //kontroluje zda x , y jsou na pozici karty
    containsPoint(x, y) {
        return x > this._x &&
               y > this._y &&
               x < this._x + this._width &&
               y < this._y + this._height;
    }
}
class Button extends Sprite{

    constructor(x,y,width,height,sprite = null, name){
        super(x,y,width,height,sprite,'white');   
        this.name = name;
    }
    //renderuje button
    render(ctx){
        if (this._sprite){
            super.render(ctx)
        }
        else {
            
            ctx.fillStyle = 'black';
            ctx.fillRect(this._x, this._y, this._width, this._height);
            ctx.fillStyle = 'white';
            ctx.fillRect(this._x + 2, this._y + 2, this._width - 4, this._height - 4)
            ctx.fillStyle = 'black';
            ctx.fillText(this.name, this._x + 25, this._y + (this._height/1.8));
        }


    }
    //kontroluje zda x , y jsou na pozici buttonu
    isPressed(x, y) {
        return x > this._x &&
               y > this._y &&
               x < this._x + this._width &&
               y < this._y + this._height;
    }

}
let rows = 4;
let colums = 4;
let pexeso = new Pexeso(rows,colums, LoadableSprites);
pexeso.renderCards(ctx);
pexeso.updateGreyPanel(ctx);



canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    pexeso.flipCardAt(x, y);
    if(pexeso.button1.isPressed(x,y)){restart();}
    if(pexeso.button2.isPressed(x,y)){small();}
    if(pexeso.button3.isPressed(x,y)){mid();}
    if(pexeso.button4.isPressed(x,y)){big();}
    if(pexeso.button5.isPressed(x,y)){bigger();}


});

function restart() {
    pexeso = new Pexeso(rows,colums,LoadableSprites)
    pexeso.renderCards(ctx);
    pexeso.updateGreyPanel(ctx);

}
function small(){
    rows   = 4;
    colums = 4;
    pexeso = new Pexeso(rows,colums,LoadableSprites)
    pexeso.renderCards(ctx);
    pexeso.updateGreyPanel(ctx);
}
function  mid(){
    rows   = 8;
    colums = 8;
    pexeso = new Pexeso(rows,colums,LoadableSprites)
    pexeso.renderCards(ctx);
    pexeso.updateGreyPanel(ctx);
}
function  big(){
    rows   = 10;
    colums = 10;
    pexeso = new Pexeso(rows,colums,LoadableSprites)
    pexeso.renderCards(ctx);
    pexeso.updateGreyPanel(ctx);
}
function bigger(){
    rows   = 24;
    colums = 24;
    pexeso = new Pexeso(rows,colums,LoadableSprites)
    pexeso.renderCards(ctx);
    pexeso.updateGreyPanel(ctx);
}