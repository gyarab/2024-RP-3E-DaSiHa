import { Sprite }    from  '../../Monkey-Engine/Sprite.js';
import { Ledvadva }  from '../main.js';
import { Rectangle } from '../../Monkey-Engine/Rectangle.js';
import { LevelSelect, Platform, SemiSolid, Solid, Selector, Closet} from '../../Monkey-Engine/PlatformerLib.js';
import { 
    IndicatorKey_E, IndicatorKey_Shift, IndicatorKey_E_Shift, 
    IndicatorKey_F, IndicatorKey_K, ///IndicatorKey_F_K,
    IndicatorKey_G, IndicatorKey_L, ///IndicatorKey_G_L,
    IndicatorKey_Left, IndicatorKey_Right, IndicatorKey_DiS_Left, IndicatorKey_DiS_Right
} from  '../../Monkey-Engine/PlatformerLib.js';
import { InteractableIndicator } from '../../Monkey-Engine/Interactable.js';

//@------------------------------ VISUALS----------------------------------@//
////---------//                 Indicators                  ////
        const E      = new IndicatorKey_E();
        const F      = new IndicatorKey_F();
        const G      = new IndicatorKey_G();

        const Shift  = new IndicatorKey_Shift();
        const K      = new IndicatorKey_K();
        const L      = new IndicatorKey_L();


        const EShift = new IndicatorKey_E_Shift();
        ///
        /// 

        const Left   = new IndicatorKey_Left();
        const Right  = new IndicatorKey_Right();
        const DisL  = new IndicatorKey_DiS_Left();
        const DisR  = new IndicatorKey_DiS_Right();

        const msg = new InteractableIndicator(
            0,0,140, 76,"../Game_01_Ledvadva/sprites/Indicators/get_a_room.png"
        );
        const msgShadow = new InteractableIndicator(
            0,0,160,76,"../Game_01_Ledvadva/sprites/Hub/shadow.png"
        )

        
    //Room
        const Blue = new Rectangle(0,0,1920,1080,"grey")
        const Print = new Sprite(0,0,1920,1080,"../Game_01_Ledvadva/sprites/Hub/hub01.png");
    //Furniture
        const furniture = new Sprite(0,0,1920,1080,"../Game_01_Ledvadva/sprites/Hub/furniture.png");
        const desk    = new Sprite(1084,712, 728, 364,"../Game_01_Ledvadva/sprites/Hub/desk.png");
        const clock   = new Sprite(1092,912, 188, 140,"../Game_01_Ledvadva/sprites/Hub/clock.png");
        const frame   = new Sprite(  0, 0, 1920,1080,"../Game_01_Ledvadva/sprites/Hub/frame.png");

    //Bookshelf
        const shelf1 = new Sprite(124,912,716,136,"../Game_01_Ledvadva/sprites/Hub/shelf-1.png");
        const shelf2 = new Sprite(124,754,716,136,"../Game_01_Ledvadva/sprites/Hub/shelf-2.png");
        const shelf3 = new Sprite(124,600,716,136,"../Game_01_Ledvadva/sprites/Hub/shelf-3.png");
        const shelf4 = new Sprite(124,444,716,136,"../Game_01_Ledvadva/sprites/Hub/shelf-4.png");
        const shelf5 = new Sprite(124,288,716,136,"../Game_01_Ledvadva/sprites/Hub/shelf-5.png");
        ///const shelf6 = new Sprite(124,124,716,144,"../Game_01_Ledvadva/sprites/Hub/shelf-6.png");

        const shadow1 = new Sprite(124,912,716,136,"../Game_01_Ledvadva/sprites/Hub/shadow.png");
        const shadow2 = new Sprite(124,756,716,136,"../Game_01_Ledvadva/sprites/Hub/shadow.png");
        const shadow3 = new Sprite(124,600,716,136,"../Game_01_Ledvadva/sprites/Hub/shadow.png");
        const shadow4 = new Sprite(124,444,716,136,"../Game_01_Ledvadva/sprites/Hub/shadow.png");
        const shadow5 = new Sprite(124,288,716,136,"../Game_01_Ledvadva/sprites/Hub/shadow.png");
        const shadow6 = new Sprite(124,124,716,144,"../Game_01_Ledvadva/sprites/Hub/shadow.png");

        const shelfsAndShadow = [shelf1,shelf2,shelf3,shelf4,shelf5,shadow1,shadow2,shadow3,shadow4,shadow5,shadow6];

        const nike   = new Sprite(704,970,128,76,"../Game_01_Ledvadva/sprites/Interactable/LevelSelect/shoebox.png");
        const control= new Sprite(142,850,92,40,"../Game_01_Ledvadva/sprites/Interactable/LevelSelect/controler.png");
        const games  = new Sprite(240,812,152,76,"../Game_01_Ledvadva/sprites/Interactable/LevelSelect/games.png");
        const fairy  = new Sprite(488,514,100,64,"../Game_01_Ledvadva/sprites/Interactable/LevelSelect/fairytale.png");
        const study  = new Sprite(364,674,104,60,"../Game_01_Ledvadva/sprites/Interactable/LevelSelect/study.png");
        const dark   = new Sprite(324,334,144,88,"../Game_01_Ledvadva/sprites/Interactable/LevelSelect/dark.png");
        const candle = new Sprite(416,330,28,64,"../Game_01_Ledvadva/sprites/Interactable/LevelSelect/candle.png");
        const book   = new Sprite(508,712,200,24,"../Game_01_Ledvadva/sprites/Interactable/Closet/1.png")

        const ChangingRoom = new Closet( 508,  636);

//@------------------------------STRUCTURE----------------------------------@//

///const _1010 = new Rectangle(1092,  896,  212,   16);//drawer-3
///const _3011 = new Rectangle( 132,  920, 392,  128, "orange");//folders
///const _3015 = new Rectangle( 396,  764, 428,  128, "orange");//folders
////---------//                     Solid                      ////
    const _0001 = new Solid(1624,  480,  128,  240); _0001._id = "pc" 
    const _0002 = new Solid( 920,  276,  604,   52); _0002._id = "shelf"  
    const _0003 = new Solid(   0, 1072, 1920,   16); _0003._id = "floor"
    const _0004 = new Solid(1292,  720,  516,   36); _0004._id = "desk-1"
    const _0005 = new Solid(1080,  720,   24,   36); _0005._id = "desk-2"
////---------//                    SemiSolid                  ////
    const _s001 = new SemiSolid( 112,  124,   16,  924,"yellow"); // library-wall-1
    const _s002 = new SemiSolid( 836,  124,   16,  924,"yellow"); // library-wall-2
    const _s003 = new SemiSolid(1092,  720,   12,  180,"yellow");
    const _s004 = new SemiSolid(1292,  720,   12,  180,"yellow");
    const _s005 = new SemiSolid(1092, 912, 12, 140, "yellow") // drawers
    const _s006 = new SemiSolid(1292, 912, 12, 140, "yellow") // -//-
////-----------------//             Platforms                  ////
    const _3001 = new Platform( 112,  112, 740,   12) // library
    const _3002 = new Platform( 128,  268, 708,   20) // -//-
    const _3003 = new Platform( 128,  424, 708,   20) // -//-
    const _3004 = new Platform( 128,  580, 708,   20) // -//-
    const _3005 = new Platform( 128,  736, 708,   20) // -//-
    const _3006 = new Platform( 128,  892, 708,   20) // -//-
    const _3007 = new Platform( 128, 1048, 708,   24) // -//-
    const _3008 = new Platform(1104,  720, 188,   36) // drawers
    const _3013 = new Platform(1104,  784, 188,    8) // -//-
    const _3009 = new Platform(1104,  836, 188,    8) // -//-
    const _3010 = new Platform(1104, 1044, 188,   28) // -//-
////---------//                   Interactable                 ////
    ////---------//               LevelSelect                  ////
        const lvl01 = new LevelSelect( 704,  972, 128,  76, 1);
        const lvl02 = new LevelSelect( 240,  816, 156,  76, 2);
        const lvl03 = new LevelSelect( 384,  676,  76,  28, 3);   
        const lvl04 = new LevelSelect( 488,  516, 100,  64, 4);
        const lvl05 = new LevelSelect( 356,  364, 104,  32, 5);
        ///const _5700 = new Rectangle  ( 142,  856,  92,  36); games
         ///const _5701 = new Rectangle  ( 364,  704, 104,  32); study
        ///const _5702 = new Rectangle  ( 324,  396, 144,  28); dark
    ////---------//                  Selector                  ////
    const select_skin = new Selector   ( 576,  712,  56, 24);
//@
const Hitboxes = [
    _0001,_0002,_0003,_0004,_0005,
    _s001,_s002,_s003,_s004,_s005,_s006,
    _3001,_3002,_3003,_3004,_3005,_3006,_3007,_3008,_3013,_3009,_3010,
    lvl01,lvl02,lvl03,lvl04,lvl05,
    select_skin
];
//@------------------------------ RENDER----------------------------------@//
function renderLevelSelect(level, sprite, heightOfHover = 1.3){
    if (level._isComplete) { sprite.render(ctx);}
    if (isPlayersInterac(level)) {
        showIndicatorsFor('action', level, heightOfHover);
        sprite.render(ctx);
    }
}
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
                console.log("GET A ROOM");
            }
            break;
        case 'backward':
            if (interactable._isInteractableWith[p1._id] && !interactable._isInteractableWith[p2._id]){
                F.moveTo(heightOfHover); F.render(ctx);
            } else if (interactable._isInteractableWith[p2._id] && !interactable._isInteractableWith[p1._id]){
                K.moveTo(heightOfHover); K.render(ctx);
            } else if (interactable._isInteractableWith[p1._id] && interactable._isInteractableWith[p2._id]){
               console.log("GET A ROOM");
            }
            break;
        default: 
            console.error("No such interaction");
            break;
    }
}
///const hasY_Axis = [candle, book];
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

export function _00_RENDER(){
    

    Blue.render(ctx,true);
    furniture.render(ctx);
    desk.render(ctx);
    
    for ( let s of shelfsAndShadow ){ s.render(ctx); }

    renderLevelSelect(lvl01, nike);
    renderLevelSelect(lvl02, games);
    renderLevelSelect(lvl03, study);
    renderLevelSelect(lvl04, fairy);
    renderLevelSelect(lvl05, dark, 1.6);

    Ledvadva.players[0].updatePos(Hitboxes);
    Ledvadva.players[0].updateImage();
    Ledvadva.players[0].render(ctx, Ledvadva.Modes.infoMode);

    Ledvadva.players[1].updatePos(Hitboxes);
    Ledvadva.players[1].updateImage();
    Ledvadva.players[1].render(ctx, Ledvadva.Modes.infoMode);

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
    if(Ledvadva.Modes.infoMode){
        Hitboxes.forEach(hitbox => hitbox.render(ctx));
    }
    Ledvadva.players[0]._wantInteract = "none";
    Ledvadva.players[1]._wantInteract = "none";
}