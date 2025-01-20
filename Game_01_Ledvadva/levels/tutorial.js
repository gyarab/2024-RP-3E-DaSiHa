    /*-------------------------Obstacles------------------------------*/
    const w1 = new Tetragon(
        {x: 200, y:   0},
        {x: 600, y:   0},
        {x: 600, y: 300},
        {x: 200, y: 300},
        "grey"
    )
    const w2 = new Tetragon(
        {x: 200, y:  50},
        {x: 900, y:  50},
        {x: 900, y: 150},
        {x: 200, y: 150},
        "grey"
    )
    const w3 = new Tetragon(
        {x: 200, y:  50},
        {x: 400, y:  50},
        {x: 400, y: 150},
        {x: 200, y: 150},
        "grey"
    )
    const w4 = new Tetragon(
        {x: 200, y:  50},
        {x: 400, y:  50},
        {x: 400, y: 100},
        {x: 200, y: 100},
        "grey"
    )
    const w5 = new Tetragon(
        {x:   0, y:  0},
        {x:1500, y:  0},
        {x:1500, y:200},
        {x:   0, y:200},
        "grey"
    )
    const w6 = new Tetragon(
        {x:   0, y:   0},
        {x:   0, y: 400},
        {x: 250, y: 400},
        {x: 250, y:   0},
        "grey"
    )

    w1.moveTo(0     ,   400);
    w2.moveTo(650   ,   600);
    w3.moveTo(950   ,   500);
    w4.moveTo(650   ,   320);
    w5.moveTo(0     ,   900);
    w6.moveTo(1500  ,   760);

    const obsticles  = [w1, w2, w3, w4, w5, w6];
    
    /*------------------------Bottles---------------------------------*/
    const bottleBLU = new Sprite( null, null, 64, 64,
        "/Game_01_Ledvadva/sprites/BLU/b7.png"
    );
    bottleBLU.moveTo(720, 220);
    const bottleRED = new Sprite( null, null, 64, 64,
        "/Game_01_Ledvadva/sprites/BLU/b7.png"
    );
    bottleRED.moveTo(400, 800);
    const bottleORA = new Sprite( null, null, 64, 64,
        "/Game_01_Ledvadva/sprites/BLU/b7.png"
    );
    bottleORA.moveTo(1000, 800);
    const bottles = [bottleBLU, bottleRED, bottleORA];