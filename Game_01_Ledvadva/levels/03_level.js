//@-------------------------------IMPORTS-----------------------------------@//

import { Ledvadva } from "../../Game_01_Ledvadva/main.js";
import { Solid, Platform } from "../../Monkey-Engine/PlatformerLib.js";
import { Sprite }     from '../../Monkey-Engine/Sprite.js';
import { SpriteAnim } from "../../Monkey-Engine/SpriteAnim.js";
import { Tetragon } from "../../Monkey-Engine/Tetragon.js";

//@------------------------------STRUCTURE----------------------------------@//
////---------//                      Solid                     ////
    const _0001 = new Solid(  92,    8,  708,   24);
    const _0002 = new Solid(  68,   32,   24, 1028);
    const _0003 = new Solid(  92, 1060, 1428,   12);
    const _0004 = new Solid( 852,   68,  832,   24);
    const _0005 = new Solid(  92,  748,  696,   12);
    const _0006 = new Solid(  92,  904,  576,   12);  
    const _0007 = new Solid( 252,  592, 1460,   12);
    const _0008 = new Solid( 252,  436, 1272,   12);
    const _0009 = new Solid( 252,  388,   24,   48);
    const _0010 = new Solid( 932,  844,  592,   12);
    const _0011 = new Solid( 620,  236, 1064,   12);
    const _0012 = new Solid(1684,   92,   24,  500);
    const _0013 = new Solid(1008,  386,  420,   52);
    const _0014 = new Solid(1800,  668,   24,  196); _0012._color = 'black'

    const _7014 = new Tetragon(
        {x: 1522,y: 1064},{x: 1800, y: 866},
        {x: 1814,y:  866},{x: 1520, y: 1070},
        'red'
    ); _7014._strokeWidth = 4;
    const _7015 = new Tetragon(
        {x:  790, y: 750},{x:  930, y: 848},
        {x: 930, y: 854},{x:   790, y: 756},
        'red'
    ); _7015._strokeWidth = 4;  

////---------//                    Platforms                   ////
    const _3001 = new Platform( 1524, 844, 280, 12);

////---------//                    Pushable                    ////
////---------//                  Interactable                  ////
    ////---------//          Endlevel / LevelSelect        ////
    ////---------//      Selectors / Switchs / Buttons     ////
    const hitboxes = [
        _0001, _0002, _0003, _0004, _0005, _0006,
        _0007, _0008, _0009, _0010, _0011, _0012,
        _0013, _0014,
        _3001,
        _7014, _7015,
    ]
//@-------------------------------VISUALS-----------------------------------@//
const pathTolvl = "../Game_01_Ledvadva/sprites/Lvl-03/";
const Backgrnd = new Sprite(68, 0, 1760, 1080, pathTolvl +"Background.png");
const Fargrnd  = new Sprite(0, 0, 1920, 1080,"");
const Midgrnd  = new Sprite(0, 0, 1920, 1080,"");
const Forgrnd  = new Sprite(0, 0, 1920, 1080,"");
//17*4, 24*4
const barrel = new SpriteAnim(964, 964, 66 * 4, 28 * 4, [ 
    pathTolvl +  "spil/1.png", pathTolvl + "spil/2.png" ,
    pathTolvl +  "spil/3.png", pathTolvl + "spil/4.png" ,
    pathTolvl +  "spil/5.png", pathTolvl + "spil/6.png" ,
    pathTolvl +  "spil/7.png", pathTolvl + "spil/8.png" ,
    pathTolvl +  "spil/9.png", pathTolvl + "spil/10.png",
    pathTolvl + "spil/11.png", pathTolvl + "spil/12.png",
]);
barrel._animSlow = 30;

//@-------------------------------RENDER------------------------------------@//

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
////---------//                  Restart                      ////
export function restart_03(){ 

        Ledvadva.players[0].moveTo(1920 / 2, 960);
        Ledvadva.players[1].moveTo(1920 / 2, 960);
        Ledvadva.shouldRestart = false;
    }
////---------//                  LvlLoop                      ////
    export function _03_RENDER(){
        if (Ledvadva.shouldRestart){ restart_03();}
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        Backgrnd.render(ctx);
        if (Ledvadva.Modes.infoMode){
            hitboxes.forEach(hitbox => {hitbox.render(ctx);});
            ///Ledvadva.infoBar.render(ctx);

        }
        
        barrel.render(ctx);
        barrel.updateImage();

            Ledvadva.players[0].updatePos(hitboxes);
            Ledvadva.players[0].updateImage();
            Ledvadva.players[0].render(ctx, Ledvadva.Modes.infoMode);
        
            Ledvadva.players[1].updatePos(hitboxes);
            Ledvadva.players[1].updateImage();
            Ledvadva.players[1].render(ctx, Ledvadva.Modes.infoMode);


    }
