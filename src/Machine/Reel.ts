import { Container } from 'pixi.js';
import { MachineSymbol } from './MachineSymbol';
import { GLOBALS } from '../Globals';

export class Reel extends Container {

    private symbols: MachineSymbol[];

    private spinning: boolean = true;
    private spinningSpeed: number = 10;

    constructor(x: number) {
        super();

        this.initializeSymbols();

        this.x = x;
    }

    public update(dt: number): void {
        if (this.spinning) {
            for (let i = 0; i < this.symbols.length; i++) {
                this.symbols[i].y += this.spinningSpeed * dt;
            }
            this.symbols.forEach(symbol => {
                if (symbol.y > 500) {
                    const index = this.symbols.indexOf(symbol);
                    if (index === 0) {
                        // shouldn't happen
                        return;
                    }
                    this.symbols.splice(index, 1);
                    symbol.y = this.symbols[0].y - GLOBALS.REEL_SYMBOL_SPACING;
                    symbol.setTexture(GLOBALS.SYMBOLS[Math.floor(Math.random() * GLOBALS.SYMBOLS.length)]);
                    this.symbols.unshift(symbol);
                }
            })
        }
    }

    public startSpinning(): void {
        if (this.spinning) {
            return;
        }

        this.spinning = true;
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