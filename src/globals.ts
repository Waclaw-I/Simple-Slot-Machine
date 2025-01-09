
export type MachineSymbols = 'high1' | 'high2' | 'high3' | 'low1' | 'low2' | 'low3' | 'low4';
type Globals = Readonly<{
    SCREEN: Readonly<{
        width: number,
        height: number
    }>,
    SYMBOL_WIDTH: number,
    SYMBOL_HEIGHT: number,
    REEL_SYMBOL_SPACING: number;
    REEL_X_POS: number[],
    SYMBOLS: MachineSymbols[],
}>;

export const GLOBALS: Globals = {
    SCREEN: {
        width: 1920,
        height: 1080
    },
    SYMBOL_WIDTH: 320,
    SYMBOL_HEIGHT: 320,
    REEL_SYMBOL_SPACING: 190,
    REEL_X_POS: [
        -400,
        -200,
        0,
        200,
        400
    ],
    SYMBOLS: ['high1', 'high2', 'high3', 'low1', 'low2', 'low3', 'low4']
}