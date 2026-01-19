//@------------------------------IMPORTS----------------------------------@//


import { Scissors, Solid, Platform, Box, PointerToHub, PointerToHubSprite} from '../../Monkey-Engine/PlatformerLib.js';
import { Sprite }     from '../../Monkey-Engine/Sprite.js';
import { SpriteStack }from '../../Monkey-Engine/SpriteStack.js';
import { Ledvadva }   from '../main.js';
import { RENDER_PLAYERS, RENDER_MODES, RENDER_IRIS, playersColideWith } from '../main.js';

//@------------------------------STRUCTURE----------------------------------@//

////---------//                Platform                        ////
    const pl = new SpriteStack();
    pl.push(
        new Platform(748, 968, 12, 12),
        new Platform(840, 968, 12, 12),
        new Platform(760, 928, 12, 12),
        new Platform(828, 928, 12, 12),
        new Platform(762, 888, 56, 12),
        new Platform(784, 848, 32, 12)
    );
////---------//                  Solid                        ////
    const sol = new SpriteStack();
    sol.push(
        new Solid(   0, 1000, 1920,    8),
        new Solid(  140, 872,  428,  128),
        new Solid(  208, 744,  272,  128),
        new Solid(  284, 616,  128,  128),
        new Solid( 1372, 872,  260,  128),
        new Solid( 1400, 616,  128,  128),
        new Solid( 1444, 488,  128,  128),
        new Solid(    0,   0,    8, 1080),
        new Solid( 1912,   0,    8, 1080)
    );

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
const HitBoxes = [_0001,_0002,_0003,_0004,_0005,_0006,_0007,_0008, _0009];
HitBoxes.push(... pl, endOfLevel);

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

    export function RESET_PLAYERS({X:x0, Y:y0}, {X:x1, Y:y1}){
        x0  &&   y0  && Ledvadva.players[0].moveTo(x0, y0);
        Ledvadva.players[0]._xVelocity = 0; 
        Ledvadva.players[0]._yVelocity = 0;
        Ledvadva.players[1]._currentFrame = 0;
        x1  &&   y1  && Ledvadva.players[1].moveTo(x1, y1);
        Ledvadva.players[1]._xVelocity = 0; 
        Ledvadva.players[1]._yVelocity = 0;
        Ledvadva.players[1]._currentFrame = 0;
    }
    export function RESTART_01(){ 
            ctx.reset();

            scissors.moveTo(200, 744);

            box.moveTo(1000, 870);
            box._xVelocity = 0;

            Ledvadva.players[0].moveTo(1200,860);
            Ledvadva.players[0]._xVelocity = 0;
            Ledvadva.players[0]._yVelocity = 0;
            Ledvadva.players[1].moveTo(1300,860);
            Ledvadva.players[1]._xVelocity = 0;
            Ledvadva.players[1]._yVelocity = 0;
            if ( Ledvadva.iris._radius >= Ledvadva.iris._MAX_RADIUS ){ 
                Ledvadva.shouldRestart = false;
                Ledvadva.modes.pause = false;
                Ledvadva.iris.zoomDir = 0;
                Ledvadva.iris.radius = Ledvadva.iris._MIN_RADIUS; 
            }        
        }
    ////---------//                  Iris                     ////


////---------//                zoomInAndOut                   ////

////---------//                  LvlLoop                      ////
    //* flags for Mainloop *//
    let infoM;
    let pauseM;

    export function RENDER_01(){
        infoM = Ledvadva.modes.infoMode;
        pauseM = Ledvadva.modes.pause;


        if(Ledvadva.shouldRestart){ 
            Ledvadva.iris.zoomDir = 1;
            Ledvadva.iris.lockedOn = Ledvadva.players[0];
            Ledvadva.modes.pause = true;
            RESTART_01(); 
        }
        RENDER_IRIS(ctx);

        //! why ut has to be in loop idk !!!
        let Structure = new SpriteStack();
        Structure.push( 
            _0001, _0002, _0003, _0004, _0005, _0006, _0007, _0008, _0009,
            pl,
            box, endOfLevel,
            Ledvadva.players[0], Ledvadva.players[1]
        );

        backgrnd.render(ctx);
        endOfLevelSprite.render(ctx);

        RENDER_PLAYERS(ctx, Structure);

        if (!pauseM) box.updatePos(Structure); 
        box.render(ctx, infoM);

        if (scissors._x  > 1920 ){ scissors._x = 0 - scissors._width; };
        scissors.render(ctx, infoM); scissors.updateImage();
        if (!pauseM) scissors.updatePos(); 
        if (playersColideWith(scissors) !== false){ Ledvadva.shouldRestart = true;}

        steps.render(ctx);
        if (infoM ||  playersColideWith(Forgrnd) !== false){
            ForgAct.render(ctx); } else { Forgrnd.render(ctx); 
        }
        RENDER_MODES(ctx, HitBoxes);
    }