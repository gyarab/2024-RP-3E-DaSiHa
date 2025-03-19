import { Scissors, Solid, Platform, Box, Ball, Ladder } from '../../Monkey-Engine/PlatformerLib.js';
import { Ledvadva } from '../main.js';
import { Sprite } from '../../Monkey-Engine/Sprite.js';

//@------------------------------ VISUALS----------------------------------@//
const Backgrnd = new Sprite(0, 0, 1920, 1080,"../Game_01_Ledvadva/sprites/Lvl-01/Background.png");
const Forgrnd  = new Sprite(1464, 680, 280, 400,"../Game_01_Ledvadva/sprites/Lvl-01/Foreground.png");
const ladder   = new Sprite(702,820,116,180,"../Game_01_Ledvadva/sprites/Random/ladder.png");
////---------//                 Indicators                     ////
    ///
//@------------------------------STRUCTURE----------------------------------@//
////---------//                 Enemy                          ////
    const Enemy = new Scissors(200, 744);
    Enemy._isGoRight = true
    Enemy._xSpeed = 3;
////---------//                Platform                        ////
    const _l01 = new Platform( 708, 968, 12, 12);
    const _l02 = new Platform( 800, 968, 12, 12);
    const _l03 = new Platform( 720, 928, 12, 12);
    const _l04 = new Platform( 788, 928, 12, 12);
    const _l05 = new Platform( 732, 888, 56, 12); 
    const _l06 = new Platform( 744, 848, 32, 12);
////---------//                     Solid                      ////
    const _0001 = new Solid(  0, 1000, 1920,  8);
    const _0002 = new Solid( 140,  872,  428, 128);
    const _0003 = new Solid( 208,  744,  272, 128);
    const _0004 = new Solid( 284,  616, 128, 128);
    const _0005 = new Solid(1372, 872, 260, 128);
    const _0006 = new Solid(1400, 616, 128, 128);
    const _0007 = new Solid(1444, 488, 128, 128);
////---------//                     Interactable               ////
    ////---------//                     Box                    ////
        const box   = new Box(1000, 870, 3);
    ////---------//                   Endlevel                 ////
        ///
////---------//
const HitBoxes = [
    _0001,_0002,_0003,_0004,_0005,_0006,_0007,
    _l01,_l02,_l03,_l04,_l05,_l06,
    ];
let Structure;

//@------------------------------RENDER----------------------------------@//
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
////---------//                  Restart                      ////
    let shouldRestart = true;
    function restart_01(){ 
        Ledvadva.players[0].moveTo(1200,860);
        Ledvadva.players[1].moveTo(1300,860);
        box.moveTo(1000, 870);
        Enemy.moveTo(200, 744);
        shouldRestart = false;
    }
////---------//                  LvlLoop                      ////
    export function _01_RENDER(){
        if(shouldRestart){ restart_01();}
        Backgrnd.render(ctx);
        Structure = [
            _0001,_0002,_0003,_0004,_0005,_0006,_0007,
            _l01,_l02,_l03,_l04,_l05,_l06,
            box, Ledvadva.players[0], Ledvadva.players[1]
        ];

        Ledvadva.players[1].updatePos(Structure);
        Ledvadva.players[1].updateImage();
        Ledvadva.players[1].render(ctx, Ledvadva.Modes.infoMode);

        Ledvadva.players[0].updatePos(Structure);
        Ledvadva.players[0].updateImage();
        Ledvadva.players[0].render(ctx, Ledvadva.Modes.infoMode);

        box.updatePos(Structure);
        box.render(ctx, Ledvadva.Modes.infoMode);

        Enemy.render(ctx);
        Enemy.updatePos();
        Enemy.updateImage()

        if (Enemy._x  > 1920 ){ Enemy._x = 0 - Enemy._width; };
        ladder.render(ctx);

        if (Ledvadva.players[0].doesColideWith(Enemy) || Ledvadva.players[1].doesColideWith(Enemy)){
            shouldRestart = true;
        }

        if (Ledvadva.Modes.infoMode) {
            HitBoxes.forEach(hitbox => hitbox.render(ctx));
            Ledvadva.infoBar.render(ctx);
        }

        Forgrnd.render(ctx);
    }
