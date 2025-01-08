import { Container } from 'pixi.js';
import { MachineSymbol } from './MachineSymbol';
import { GLOBALS } from '../Globals';

export class Reel extends Container {

    private symbols: MachineSymbol[];

    constructor(x: number) {
        super();

        this.initializeSymbols();

        this.x = x;
    }

    private initializeSymbols(): void {
        this.symbols = [];


        for (let i = 0; i < 5; i++) {
            const symbol = new MachineSymbol(0, i * GLOBALS.REEL_SYMBOL_SPACING - 2 * GLOBALS.REEL_SYMBOL_SPACING, "low2");
            this.symbols.push(symbol);
            this.addChild(symbol);
        }
    }
}