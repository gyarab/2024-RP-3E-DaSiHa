import { Menu } from '../../Monkey-Engine/Menu.js';
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
/*--------------------------Menus--------------------------------*/
    
    let object = [];

    let ObjMenu   = new Menu(0, 0, 360, 80, 4);
        ObjMenu.rearange("socket");
        ObjMenu.fontSize = 50;
        ObjMenu._boxes[0].text = "select";    
        ObjMenu._boxes[1].text = "info";
        ObjMenu._boxes[2].text = "refactor";
        ObjMenu._boxes[3].text = "delete";
        ObjMenu._boxes[0].foldable = true
        ObjMenu._boxes[1].foldable = true
        ObjMenu._boxes[2].foldable = true

    let NonObjMenu = new Menu(0, 0, 360, 80, 2);
        NonObjMenu.rearange("socket");
        NonObjMenu.fontSize = 50;
        NonObjMenu._boxes[0].text = "new";    
        NonObjMenu._boxes[1].text = "...";
        NonObjMenu._boxes[0].foldable = true

    let SelectMenu = new Menu(0,0,176,40,3);
        SelectMenu.rearange("socket-small");
        SelectMenu.fontSize = 25;
        SelectMenu._boxes[0].text = "drag";
        SelectMenu._boxes[1].text = "moveTo";
        SelectMenu._boxes[2].text = "...";

    let InfoMenu   = new Menu(0, 0, 360, 40, 4);
        InfoMenu.rearange("plain-long");
        InfoMenu.fontSize = 25;

    let RefactMenu  = new Menu(0,0,176,40,2);
        RefactMenu.rearange("socket-small");  
        RefactMenu._boxes[0].text = "rename";
        RefactMenu._boxes[1].text = "recolor";
    
    let NewMenu     = new Menu(0,0,176,40,3);
        NewMenu.rearange("socket-small");
        NewMenu._boxes[0].text = "player1";
        NewMenu._boxes[1].text = "...";

    let pressedObj = null;
/*--------------------------onLeftClick--------------------------------*/
    window.addEventListener('click', event => handleClick(event));
    function handleClick(event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;

        NonObjMenu.isVisable  = false;
        SelectMenu.isVisable = false;
        InfoMenu.isVisable   = false;
        RefactMenu.isVisable = false;
        NewMenu.isVisable    = false;
        CorMenu.isVisable    = false;

        let pressedBox = null;
            
        let menusBoxes = [];

        if (ObjMenu._isVisable && !NonObjMenu._isVisable) {
            for (let i = 0; i < ObjMenu._boxes.length; i++) {
                menusBoxes.push(ObjMenu._boxes[i]);
            }
            menusBoxes.forEach(box => {
                if (
                    mouseX >= box._x && mouseX <= box._x + box._width &&
                    mouseY >= box._y && mouseY <= box._y + box._height
                ) {
                    pressedBox = box;
                }
            });
        }
        if (NonObjMenu._isVisable  && !ObjMenu._isVisable) {
            for (let i = 0; i < NonObjMenu._boxes.length; i++) {
                menusBoxes.push(NonObjMenu._boxes[i]);
            }
            menusBoxes.forEach(box => {
                if (
                    mouseX >= box._x && mouseX <= box._x + box._width &&
                    mouseY >= box._y && mouseY <= box._y + box._height
                ) {
                    pressedBox = box;
                    console.log(pressedBox)
                }
            });
        }
        
        if (pressedBox) {
            switch (pressedBox._text) {
            case "select":
                SelectMenu.isVisable = true;
                SelectMenu.moveTo(pressedBox._x + pressedBox._width, pressedBox._y)
                break;
            case "info":
                InfoMenu.isVisable = true;
                InfoMenu.moveTo(pressedBox._x + pressedBox._width, pressedBox._y)
                InfoMenu._boxes[0].text = "ID: " + pressedObj._id;
                InfoMenu._boxes[1].text = "Type: " + pressedObj.constructor.name;
                InfoMenu._boxes[2].text = "Position: " + Math.floor(pressedObj._x) + "x" + Math.floor(pressedObj._y);
                InfoMenu._boxes[3].text = "Size: " + Math.floor(pressedObj._width) + "x" + Math.floor(pressedObj._height);
                break;
            case "refactor":
                RefactMenu.isVisable = true;
                RefactMenu.moveTo(pressedBox._x + pressedBox._width, pressedBox._y)
                break;
            case "delete":
                console.log("delete")
                break;
            case "new":
                NewMenu.isVisable = true;
                NewMenu.moveTo(pressedBox._x + pressedBox._width, pressedBox._y)
                break;
            default:
            }
        }else{
            ObjMenu.isVisable = false;
            NonObjMenu.isVisable = false;
        }
    }
/*----------------------onRightClick------------------------------*/
    window.addEventListener('contextmenu', event => {
        event.preventDefault();
        handleRClick(event);
    });
    
    function handleRClick(event){
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;
        const canvasX = Math.min(Math.max(mouseX, 0), canvas.width);
        const canvasY = Math.min(Math.max(mouseY, 0), canvas.height);
        let isObject = false

        SelectMenu.isVisable = false;
        InfoMenu.isVisable   = false;
        RefactMenu.isVisable = false;
        NewMenu.isVisable    = false;

        console.log(Math.floor(canvasX), Math.floor(canvasY))
        object.forEach(obj => {
            if(
                mouseX >= obj._x && mouseX <= obj._x + obj._width &&
                mouseY >= obj._y && mouseY <= obj._y + obj._height
              ){
                isObject   = true;
                pressedObj = obj;
            }
        });
        if (isObject){
            ObjMenu.moveTo(canvasX, canvasY);
            ObjMenu.isVisable = true;
            NonObjMenu.isVisable = false;
        }else{
            NonObjMenu.moveTo(canvasX, canvasY);
            NonObjMenu.isVisable = true;
            ObjMenu.isVisable = false;
        }
    }
    
    /*--------------------------ContextMenuloop--------------------------------*/
    export function ContextMenuRender() {
        if (    ObjMenu._isVisable ) {    ObjMenu.render(ctx) };
        if ( NonObjMenu._isVisable ) { NonObjMenu.render(ctx) };
        if ( SelectMenu._isVisable ) { SelectMenu.render(ctx) };
        if (   InfoMenu._isVisable ) {   InfoMenu.render(ctx) };
        if ( RefactMenu._isVisable ) { RefactMenu.render(ctx) };
        if (    NewMenu._isVisable ) {    NewMenu.render(ctx) };
    }
 /*--------------------------infoMode--------------------------------
    
 let object = [player1, player2, npc, bottleBLU, bottleRED, bottleORA, basketball];

 let ObjMenu   = new Menu(0, 0, 360, 80, 4);
     ObjMenu.rearange("socket");
     ObjMenu.fontSize = 50;
     ObjMenu._boxes[0].text = "select";    
     ObjMenu._boxes[1].text = "info";
     ObjMenu._boxes[2].text = "refactor";
     ObjMenu._boxes[3].text = "delete";
     ObjMenu._boxes[0].foldable = true
     ObjMenu._boxes[1].foldable = true
     ObjMenu._boxes[2].foldable = true

 let NonObjMenu = new Menu(0, 0, 360, 80, 2);
     NonObjMenu.rearange("socket");
     NonObjMenu.fontSize = 50;
     NonObjMenu._boxes[0].text = "new";    
     NonObjMenu._boxes[1].text = "...";
     NonObjMenu._boxes[0].foldable = true

 let SelectMenu = new Menu(0,0,176,40,3);
     SelectMenu.rearange("socket-small");
     SelectMenu.fontSize = 25;
     SelectMenu._boxes[0].text = "drag";
     SelectMenu._boxes[1].text = "moveTo";
     SelectMenu._boxes[2].text = "...";

 let InfoMenu   = new Menu(0, 0, 360, 40, 4);
     InfoMenu.rearange("plain-long");
     InfoMenu.fontSize = 25;

 let RefactMenu  = new Menu(0,0,176,40,2);
     RefactMenu.rearange("socket-small");  
     RefactMenu._boxes[0].text = "rename";
     RefactMenu._boxes[1].text = "recolor";
 
 let NewMenu     = new Menu(0,0,176,40,3);
     NewMenu.rearange("socket-small");
     NewMenu._boxes[0].text = "player1";
     NewMenu._boxes[1].text = "...";


 let AllMenus     = [];
 let pressedObj = null;

 window.addEventListener('click', event => handleClick(event));
 function handleClick(event) {
     const rect = canvas.getBoundingClientRect();
     const scaleX = canvas.width / rect.width;
     const scaleY = canvas.height / rect.height;
     const mouseX = (event.clientX - rect.left) * scaleX;
     const mouseY = (event.clientY - rect.top) * scaleY;

     SelectMenu.isVisable = false;
     InfoMenu.isVisable   = false;
     RefactMenu.isVisable = false;
     NewMenu.isVisable    = false;
     let pressedBox = null;
         
     let menusBoxes = [];

     if (ObjMenu._isVisable && !NonObjMenu._isVisable) {
         for (let i = 0; i < ObjMenu._boxes.length; i++) {
             menusBoxes.push(ObjMenu._boxes[i]);
         }
         menusBoxes.forEach(box => {
             if (
                 mouseX >= box._x && mouseX <= box._x + box._width &&
                 mouseY >= box._y && mouseY <= box._y + box._height
             ) {
                 pressedBox = box;
             }
         });
     }
     if (NonObjMenu._isVisable  && !ObjMenu._isVisable) {
         for (let i = 0; i < NonObjMenu._boxes.length; i++) {
             menusBoxes.push(NonObjMenu._boxes[i]);
         }
         menusBoxes.forEach(box => {
             if (
                 mouseX >= box._x && mouseX <= box._x + box._width &&
                 mouseY >= box._y && mouseY <= box._y + box._height
             ) {
                 pressedBox = box;
                 console.log(pressedBox)
             }
         });
     }
     
     if (pressedBox) {
         switch (pressedBox._text) {
         case "select":
             SelectMenu.isVisable = true;
             SelectMenu.moveTo(pressedBox._x + pressedBox._width, pressedBox._y)
             break;
         case "info":
             InfoMenu.isVisable = true;
             InfoMenu.moveTo(pressedBox._x + pressedBox._width, pressedBox._y)
             InfoMenu._boxes[0].text = "ID: " + pressedObj._id;
             InfoMenu._boxes[1].text = "Type: " + pressedObj.constructor.name;
             InfoMenu._boxes[2].text = "Position: " + Math.floor(pressedObj._x) + "x" + Math.floor(pressedObj._y);
             InfoMenu._boxes[3].text = "Size: " + Math.floor(pressedObj._width) + "x" + Math.floor(pressedObj._height);
             break;
         case "refactor":
             RefactMenu.isVisable = true;
             RefactMenu.moveTo(pressedBox._x + pressedBox._width, pressedBox._y)
             break;
         case "delete":
             console.log("delete")
             break;
         case "new":
             NewMenu.isVisable = true;
             NewMenu.moveTo(pressedBox._x + pressedBox._width, pressedBox._y)
             break;
         default:
         }
     }else{
         ObjMenu.isVisable = false;
         NonObjMenu.isVisable = false;
     }
 }
 /*------------------------------------------------------------------
 window.addEventListener('contextmenu', event => {
     event.preventDefault();
     handleRClick(event);
 });
 
 function handleRClick(event){
     const rect = canvas.getBoundingClientRect();
     const scaleX = canvas.width / rect.width;
     const scaleY = canvas.height / rect.height;
     const mouseX = (event.clientX - rect.left) * scaleX;
     const mouseY = (event.clientY - rect.top) * scaleY;
     const canvasX = Math.min(Math.max(mouseX, 0), canvas.width);
     const canvasY = Math.min(Math.max(mouseY, 0), canvas.height);
     let isObject = false

     SelectMenu.isVisable = false;
     InfoMenu.isVisable   = false;
     RefactMenu.isVisable = false;
     NewMenu.isVisable    = false;

     object.forEach(obj => {
         if(
             mouseX >= obj._x && mouseX <= obj._x + obj._width &&
             mouseY >= obj._y && mouseY <= obj._y + obj._height
           ){
             isObject   = true;
             pressedObj = obj;
         }
     });
     if (isObject){
         ObjMenu.moveTo(canvasX, canvasY);
         ObjMenu.isVisable = true;
         NonObjMenu.isVisable = false;
     }else{
         NonObjMenu.moveTo(canvasX, canvasY);
         NonObjMenu.isVisable = true;
         ObjMenu.isVisable = false;
     }
 }
/**/ 
