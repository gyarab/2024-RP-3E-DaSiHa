//@------------------------------IMPORTS----------------------------------@//
import { Sprite }    from  '../../Monkey-Engine/Sprite.js';
import { Rectangle } from '../../Monkey-Engine/Rectangle.js';
import { Tetragon }  from '../../Monkey-Engine/Tetragon.js';
import { SpriteStack } from '../../Monkey-Engine/SpriteStack.js';
import { Ledvadva, playersColideWith, RENDER_PLAYERS, RENDER_MODES, RENDER_IRIS,
        RESET_PLAYERS, RESET_IRIS,                                             }
from '../main.js';
import { InteractableIndicator } from '../../Monkey-Engine/Interactable.js';
import { 
    PointerToLevel, PointerToLevelSprite, 
    Platform, SemiSolid, Solid, Selector, Closet
} from '../../Monkey-Engine/PlatformerLib.js';
import { 
    IndicatorKey_E, IndicatorKey_Shift, IndicatorKey_E_Shift, 
    IndicatorKey_F, IndicatorKey_K, IndicatorKey_Left,
    IndicatorKey_G, IndicatorKey_L, IndicatorKey_Right, 
    IndicatorKey_DiS_Left, IndicatorKey_DiS_Right
} from  '../../Monkey-Engine/PlatformerLib.js';


//@------------------------------STRUCTURE----------------------------------@//
////---------//                     Solid                      ////
const _0001 = new Solid( 1624,  480,  128,  240); // pc 
const _0002 = new Solid(  920,  276,  604,   52); // shelf  
const _0003 = new Solid( 1284,  720,  524,   40); // desk
const _0004 = new Solid( 1080,  720,   32,   40); // -//-
const _0005 = new Solid( 1830,    0,    4, 1080); // wall
const _0006 = new Solid(   90,    0,    4, 1080); // -//-
const _0007 = new Solid(    0, 1080, 1920,    4); // floor

////---------//                    SemiSolid                  ////
const _s001 = new SemiSolid( 112,  124,   20,  924,"yellow"); // library-wall-1
const _s002 = new SemiSolid( 832,  124,   20,  924,"yellow"); // library-wall-2
const _s003 = new SemiSolid(1092,  760,   20,  300,"yellow"); // drawers
const _s004 = new SemiSolid(1284,  760,   20,  300,"yellow"); // -//-
////---------//                   Platforms                    ////
const _3001 = new Platform( 112,  112, 740,   12) // library
const _3002 = new Platform( 176,  268, 616,   20) // -//-
const _3003 = new Platform( 176,  424, 616,   20) // -//-
const _3004 = new Platform( 176,  580, 616,   20) // -//-
const _3005 = new Platform( 176,  736, 616,   20) // -//-
const _3006 = new Platform( 176,  892, 616,   20) // -//-
const _3007 = new Platform( 176, 1048, 616,   24) // -//-
const _3008 = new Platform(1128,  720, 140,   30) // drawers
const _3009 = new Platform(1128,  804, 140,    8) // -//-
const _3010 = new    Solid(1160,  876,  80,    8) // -//-
const _3011 = new Platform(1128, 1046, 140,   26) // -//-
////---------//                   Interactable                 ////
    ////---------//               LevelSelect                  ////
        const lvl01 = new PointerToLevel( 704,  970, 128,  78, 1);
        const lvl02 = new PointerToLevel( 240,  816, 156,  76, 2);
        const lvl03 = new PointerToLevel( 384,  674,  76,  28, 3);   
        const lvl04 = new PointerToLevel( 488,  514, 100,  66, 4);
        const lvl05 = new PointerToLevel( 356,  362, 104,  34, 5);
        const _5700 = new Rectangle  ( 142,  856,  92,  36); lvl02._addPlatform(_5700);
        const _5701 = new Rectangle  ( 328,  630,  32, 106); lvl03._addPlatform(_5701);
        const _5702 = new Rectangle  ( 364,  702, 104,  34); lvl03._addPlatform(_5702);
        const _5703 = new Rectangle  ( 324,  396, 144,  28); lvl05._addPlatform(_5703);
    ////---------//                  Selector                  ////
    const select_skin = new Selector   ( 580,  712,  56, 24);

const Hitboxes = new SpriteStack();
Hitboxes.push(
_0001, _0002, _0003, _0004, _0005, _0006, _0007,
_s001, _s002, _s003, _s004, 
_3001, _3002, _3003, _3004, _3005, _3006, _3007, _3008, _3009, _3010, _3011, 
lvl01, lvl02, lvl03, lvl04, lvl05, 
_5700, _5701, _5702, _5703,
select_skin
);
//@------------------------------ VISUALS----------------------------------@//

////---------//                             Room                         ////
    const pathToHub = "../Game_01_Ledvadva/sprites/Hub/";
    const Backgrnd = new Sprite(0,0,1920,1080,pathToHub + "Background.png");
    const Fargrnd  = new Sprite(0,0,1920,1080,pathToHub + "Farground.png");
    const BluePrnt = new Sprite(0,0,1920,1080,pathToHub + "hub01.png");
    
    const shelf1 = new Sprite(124,912,716,136,pathToHub + "shelf-1.png");
    const shelf2 = new Sprite(124,754,716,136,pathToHub + "shelf-2.png");
    const shelf3 = new Sprite(124,600,716,136,pathToHub + "shelf-3.png");
    const shelf4 = new Sprite(124,444,716,136,pathToHub + "shelf-4.png");
    const shelf5 = new Sprite(124,288,716,136,pathToHub + "shelf-5.png");

    const shadow1 = new Sprite(124,912,716,136,pathToHub + "shadow.png");
    const shadow2 = new Sprite(124,756,716,136,pathToHub + "shadow.png");
    const shadow3 = new Sprite(124,600,716,136,pathToHub + "shadow.png");
    const shadow4 = new Sprite(124,444,716,136,pathToHub + "shadow.png");
    const shadow5 = new Sprite(124,288,716,136,pathToHub + "shadow.png");
    const shadow6 = new Sprite(124,124,716,144,pathToHub + "shadow.png");

    const candle  = new Sprite( 416, 330, 28, 64,
        "../Game_01_Ledvadva/sprites/Interactable/LevelSelect/candle.png"
    );
    const shelfsAndShadow = new SpriteStack;
    shelfsAndShadow.push(
        shelf1, shelf2, shelf3, shelf4,
        shelf5, shadow1, shadow2, shadow3,
        shadow4, shadow5, shadow6 
    )

    
////---------//                             Levels                         ////
    const pathToLvls = "../Game_01_Ledvadva/sprites/Interactable/LevelSelect/"; 
    const pathToBlank = pathToLvls + "blank.png";
    const shoebox = new PointerToLevelSprite( 704, 970, 128,  76,[ pathToBlank, pathToLvls + "shoebox.png"  ], lvl01);
    const games   = new PointerToLevelSprite( 144, 812, 248,  76,[ pathToBlank, pathToLvls + "games.png"    ], lvl02);
    const study   = new PointerToLevelSprite( 328, 630, 140, 104,[ pathToBlank, pathToLvls + "study.png"    ], lvl03);
    const fairy   = new PointerToLevelSprite( 488, 514, 100,  64,[ pathToBlank, pathToLvls + "fairytale.png"], lvl04);
    const dark    = new PointerToLevelSprite( 324, 334, 144,  88,[ pathToBlank, pathToLvls + "dark.png"     ], lvl05);

    const book = new Sprite(508, 712, 200, 24, "../Game_01_Ledvadva/sprites/Interactable/Closet/1.png");
    const ChangingRoom = new Closet(508, 636);
////---------//                           Indicators                      ////
    const F = new IndicatorKey_F(); const G = new IndicatorKey_G(); 
    const K = new IndicatorKey_K(); const L = new IndicatorKey_L();

    const Left  = new IndicatorKey_Left() ; const DisL  = new IndicatorKey_DiS_Left() ;
    const Right = new IndicatorKey_Right(); const DisR  = new IndicatorKey_DiS_Right();

    const msg = new InteractableIndicator(0,0,140, 76,"../Game_01_Ledvadva/sprites/Indicators/get_a_room.png");
    const msgShadow = new InteractableIndicator(0,0,160,76, pathToHub + "shadow.png")

//@------------------------------ RENDER----------------------------------@//
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

function isPlayersInterac(interactable){
    const p1 = Ledvadva.players[0];
    const p2 = Ledvadva.players[1];
    if (interactable._isInteractableWith[p1._id]) { return true; }
    if (interactable._isInteractableWith[p2._id]) { return true; }
    return false;
}
function arePlayersInterac(interactable){
    const p1 = Ledvadva.players[0];
    const p2 = Ledvadva.players[1];
    if (interactable._isInteractableWith[p1._id] && interactable._isInteractableWith[p2._id]) { return true; }
    return false;
}
function showIndicatorsFor(interaction, interactable, heightOfHover = 1.3){
    const p1 = Ledvadva.players[0];
    const p2 = Ledvadva.players[1];
    switch (interaction) {
        case 'action': 
            if (interactable._isInteractableWith[p1._id] && !interactable._isInteractableWith[p2._id]){
                E.moveTo(interactable, heightOfHover); E.render(ctx);
            } else if (interactable._isInteractableWith[p2._id] && !interactable._isInteractableWith[p1._id]){
                Shift.moveTo(interactable, heightOfHover); Shift.render(ctx);
            } else if (interactable._isInteractableWith[p1._id] && interactable._isInteractableWith[p2._id]){
                EShift.moveTo(interactable, heightOfHover); EShift.render(ctx);
            }
            break;
        case 'forward': 
            if (interactable._isInteractableWith[p1._id] && !interactable._isInteractableWith[p2._id]){
                G.moveTo(heightOfHover); G.render(ctx);
            } else if (interactable._isInteractableWith[p2._id] && !interactable._isInteractableWith[p1._id]){
                L.moveTo(heightOfHover); L.render(ctx);
            } else if (interactable._isInteractableWith[p1._id] && interactable._isInteractableWith[p2._id]){
            }
            break;
        case 'backward':
            if (interactable._isInteractableWith[p1._id] && !interactable._isInteractableWith[p2._id]){
                F.moveTo(heightOfHover); F.render(ctx);
            } else if (interactable._isInteractableWith[p2._id] && !interactable._isInteractableWith[p1._id]){
                K.moveTo(heightOfHover); K.render(ctx);
            } else if (interactable._isInteractableWith[p1._id] && interactable._isInteractableWith[p2._id]){
            }
            break;
        default: 
            console.error("No such interaction");
            break;
    }
}
//TODO: fix candle rendering 

////---------//                  Restart                      ////
    export function RESTART_00(){ 
        ctx.reset();

        Ledvadva.currentlvl = 0;

        let x; let y;
        if (lvl05._isComplete) { x = 376; y = 236; }else 
        if (lvl04._isComplete) { x = 516; y = 386; }else
        if (lvl03._isComplete) { x = 395; y = 545; }else
        if (lvl02._isComplete) { x = 290; y = 690; }else
        if (lvl01._isComplete) { x = 744; y = 844; }else
        /* first spawn point */{ x = 990; y = 940; }

        RESET_PLAYERS( {X:x - 32, Y:y}, {X:x + 32, Y:y} );
        RESET_IRIS();

    }
////---------//                  HubLoop                      ////
export function RENDER_00(){
    if (Ledvadva.shouldRestart){
        Ledvadva.iris.zoomDir = 1;
        Ledvadva.iris.lockedOn = Ledvadva.players[0];
        Ledvadva.modes.pause = true;
        RESTART_00();
    }
    RENDER_IRIS(ctx);    

    Backgrnd.render(ctx,true);
    Fargrnd.render(ctx);
    
    for ( let s of shelfsAndShadow ){ s.render(ctx); }

    shoebox.render(ctx);
    games.render(ctx);
    study.render(ctx);
    fairy.render(ctx);
    dark.render(ctx);

    RENDER_PLAYERS(ctx, Hitboxes);

    ChangingRoom.updateImage(Ledvadva.players[0]._wantInteract, 
        select_skin._isInteractableWith[Ledvadva.players[0]._id]
        && select_skin._canGo(Ledvadva.players[0]._wantInteract)
    );
    ChangingRoom.updateImage(Ledvadva.players[1]._wantInteract,
        select_skin._isInteractableWith[Ledvadva.players[1]._id] 
        && select_skin._canGo(Ledvadva.players[1]._wantInteract)
    );

    if(isPlayersInterac(select_skin)){
        ChangingRoom.render(ctx);
        if(select_skin._reactToBackward && !arePlayersInterac(select_skin)){
            Left.moveTo(ChangingRoom, -40, -10); Left.render(ctx);
            showIndicatorsFor('backward',select_skin, Left);
        }else{
            DisL.moveTo(ChangingRoom, -40, -10); DisL.render(ctx);
        }
        if (select_skin._reactToForward && !arePlayersInterac(select_skin)){
            Right.moveTo(ChangingRoom, -40, -10); Right.render(ctx);
            showIndicatorsFor('forward',select_skin, Right);
        }else{
            DisR.moveTo(ChangingRoom, -40, -10); DisR.render(ctx);
        }
        if (arePlayersInterac(select_skin)){
            msgShadow.moveTo(select_skin, 2.5); msgShadow.render(ctx);
            msg.moveTo(select_skin, 2.5); msg.render(ctx);
        }
    }


    RENDER_MODES(ctx, Hitboxes);
}