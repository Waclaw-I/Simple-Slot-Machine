
type Globals = Readonly<{
    SYMBOL_WIDTH: number,
    SYMBOL_HEIGHT: number,
    REEL_SYMBOL_SPACING: number;
    REEL_X_POS: number[]
}>;

export const GLOBALS: Globals = {
    SYMBOL_WIDTH: 320,
    SYMBOL_HEIGHT: 320,
    REEL_SYMBOL_SPACING: 175,
    REEL_X_POS: [
        -400,
        -200,
        0,
        200,
        400
    ]
}