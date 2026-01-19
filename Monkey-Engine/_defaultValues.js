// @Autor: Bendl Šimon

const _defaultValues = {
    //Points

    p_diagonalLength: 3,
    DIAGONAL_LENGTH : 3,

    // Basic Shapes
    bS_color: 'grey',
    COLOR : 'grey',

    bS_strokeWidth: 2,
    STROKE_WIDTH : 2,

    // Iris
    i_radMAX : Math.hypot(1920, 1080),
    i_radMIN : 0,
    i_color  : 'black',

    // Sprites
    s_spritePath: "../Monkey-Engine/texture.png",
    s_color: 'magenta',
    s_renderPointAsWell: true,


    /// Animations SPEEDS ///
    // Iris
    i_zoomSpeed: 30,
    ZOOM_SPEED: 30,


    // SpriteAnims
    sA_animSlow : 100,
    ANIM_SLOW   : 100,

    //SpriteDynas
    sD_xSpeed: 2,
    X_SPEED : 2,

    sD_ySpeed: 2,
    Y_SPEED : 2,



};

export { _defaultValues };
