//@------------------------------IMPORTS----------------------------------@//

import { Scissors, Solid, Platform, Box, PointerToHub, PointerToHubSprite} from '../../Monkey-Engine/PlatformerLib.js';
import { Sprite }     from '../../Monkey-Engine/Sprite.js';
import { Ledvadva }   from '../main.js';

//@------------------------------STRUCTURE----------------------------------@//

////---------//                Platform                        ////
    const _l01 = new Platform( 748, 968, 12, 12);
    const _l02 = new Platform( 840, 968, 12, 12);
    const _l03 = new Platform( 760, 928, 12, 12);
    const _l04 = new Platform( 828, 928, 12, 12);
    const _l05 = new Platform( 762, 888, 56, 12); 
    const _l06 = new Platform( 784, 848, 32, 12);
////---------//                  Solid                        ////
    const _0001 = new Solid(   0, 1000, 1920,    8);
    const _0002 = new Solid(  140, 872,  428,  128);
    const _0003 = new Solid(  208, 744,  272,  128);
    const _0004 = new Solid(  284, 616,  128,  128);
    const _0005 = new Solid( 1372, 872,  260,  128);
    const _0006 = new Solid( 1400, 616,  128,  128);
    const _0007 = new Solid( 1444, 488,  128,  128);
    const _0008 = new Solid(    0,   0,    8, 1080);
    const _0009 = new Solid( 1912,   0,    8, 1080);
////---------//                Projectiles                      ////
    const scissors = new Scissors(200, 744);
    scissors._isGoRight = true
    scissors._xSpeed = 3.5;
////---------//                 Pushable                    ////
    const box  = new Box(1000, 870, 3);
////---------//                 Interactable               ////
    ////---------//               Endlevel                 ////
        const endOfLevel = new PointerToHub(1740, 924, 128, 76);
//@
const HitBoxes = [
    _0001,_0002,_0003,_0004,_0005,_0006,_0007,
    _l01,_l02,_l03,_l04,_l05,_l06, _0007, _0008, _0009,
    endOfLevel
    ];

let Structure;

//@------------------------------ VISUALS----------------------------------@//

const pathTolvl = "../Game_01_Ledvadva/sprites/Lvl-01/";
const backgrnd  = new Sprite(    0,   0, 1920, 1080, pathTolvl + "Background.png");
const Forgrnd   = new Sprite( 1408, 680,  280,  400, pathTolvl + "Forground.png" );
const ForgAct   = new Sprite( 1408, 680,  280,  400, pathTolvl + "ForgroundActive-2.png");

const endOfLevelSprite  = new PointerToHubSprite( 1740, 924, 128, 76, [
    pathTolvl + "nike.png", "../Game_01_Ledvadva/sprites/Interactable/LevelSelect/shoebox.png" 
    ], endOfLevel
);
const steps = new Sprite(742,820,116,180,"../Game_01_Ledvadva/sprites/Random/ladder.png");

//@------------------------------RENDER----------------------------------@//

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

////---------//                  Restart                      ////
    export function restart_01(){ 
        
        scissors.moveTo(200, 744);
        box.moveTo(1000, 870);
        box._xVelocity = 0;

        Ledvadva.players[0].moveTo(1200,860);
        Ledvadva.players[0]._xVelocity = 0;
        Ledvadva.players[0]._yVelocity = 0;
        Ledvadva.players[1].moveTo(1300,860);
        Ledvadva.players[1]._xVelocity = 0;
        Ledvadva.players[1]._yVelocity = 0;
        
        Ledvadva.shouldRestart = false;
    }
////---------//                  LvlLoop                      ////
    export function _01_RENDER(){
        if(Ledvadva.shouldRestart){ restart_01();}
        
        Structure = [
            _0001, _0002, _0003, _0004, _0005, _0006, _0007, _0008, _0009,
            _l01, _l02, _l03, _l04, _l05, _l06,
            box, endOfLevel,
            Ledvadva.players[0], Ledvadva.players[1]
        ];
        backgrnd.render(ctx);
        endOfLevelSprite.render(ctx);

        Ledvadva.players[1].updatePos(Structure);
        Ledvadva.players[1].updateImage();
        Ledvadva.players[1].render(ctx, Ledvadva.Modes.infoMode);

        Ledvadva.players[0].updatePos(Structure);
        Ledvadva.players[0].updateImage();
        Ledvadva.players[0].render(ctx, Ledvadva.Modes.infoMode);

        box.updatePos(Structure);
        box.render(ctx, Ledvadva.Modes.infoMode);

        scissors.render(ctx, Ledvadva.Modes.infoMode);
        scissors.updatePos();
        scissors.updateImage()

        if (scissors._x  > 1920 ){ scissors._x = 0 - scissors._width; };
        steps.render(ctx);

        if (Ledvadva.players[0].doesColideWith(scissors) || 
            Ledvadva.players[1].doesColideWith(scissors) ){
            Ledvadva.shouldRestart = true;
        }

        if (Ledvadva.Modes.infoMode) {
            HitBoxes.forEach(hitbox => hitbox.render(ctx));
            Ledvadva.infoBar.render(ctx);
        }

        if(
            Ledvadva.players[0].doesColideWith(Forgrnd) ||
            Ledvadva.players[1].doesColideWith(Forgrnd) ||
            Ledvadva.Modes.infoMode
        ){
            ForgAct.render(ctx);
        }else{
            Forgrnd.render(ctx);
        }
    }
