import { Container } from 'pixi.js';
import { MachineSymbol } from './MachineSymbol';
import { GLOBALS, MachineSymbols } from '../globals';
import { gsap } from "gsap";

export class Reel extends Container {

    private symbols: MachineSymbol[];

    private spinState: {
        inProgress: boolean;
        stopping: boolean;
        spinningSpeed: number;
        spinOutcome: MachineSymbols[];
        spinOutcomeStartingSymbol?: MachineSymbol;
        texturesSwapsCount: number;
    }

    constructor(x: number) {
        super();

        this.spinState = {
            inProgress: false,
            stopping: false,
            spinningSpeed: 0,
            spinOutcome: [],
            spinOutcomeStartingSymbol: undefined,
            texturesSwapsCount: 0
        }

        this.initializeSymbols();

        this.x = x;
    }

    public update(dt: number): void {
        if (this.spinState.inProgress) {
            for (let i = 0; i < this.symbols.length; i++) {
                this.symbols[i].y += this.spinState.spinningSpeed * dt;
            }
            this.symbols.forEach(symbol => {
                if (symbol.y > 500) {
                    const index = this.symbols.indexOf(symbol);
                    if (index === 0) {
                        return;
                    }
                    this.symbols.splice(index, 1);
                    symbol.y = this.symbols[0].y - GLOBALS.REEL_SYMBOL_SPACING;
                    this.symbols.unshift(symbol);

                    // TODO: make sure to remove magic numbers. Maybe this 5 can be "symbols count on reel" and being used for reel initialization too?
                    if (this.spinState.texturesSwapsCount >= 5) {
                        return;
                    }
                    if (this.spinState.spinOutcome.length === 3) {
                        this.spinState.spinOutcomeStartingSymbol = symbol;
                    }

                    let nextTexture = this.spinState.spinOutcome.pop() ?? this.getRandomMachineSymbol();
                    symbol.setTexture(nextTexture);
                    this.spinState.texturesSwapsCount++;
                }
            })

            if (this.spinState.stopping && this.spinState.spinOutcomeStartingSymbol.y > 200) {
                this.spinState.stopping = false;
                this.spinState.inProgress = false;
                this.spinState.texturesSwapsCount = 0;
                this.spinState.spinningSpeed = 0;
                this.spinState.spinOutcomeStartingSymbol = undefined;

                for (let i = 0; i < this.symbols.length; i++) {
                    gsap.to(this.symbols[i], {
                        y: i * GLOBALS.REEL_SYMBOL_SPACING - 2 * GLOBALS.REEL_SYMBOL_SPACING,
                        duration: 0.25,
                        ease: "back.out"
                    })
                    // this.symbols[i].y = i * GLOBALS.REEL_SYMBOL_SPACING - 2 * GLOBALS.REEL_SYMBOL_SPACING;
                }
            }
        }
    }



    public async startSpinning(outcome: MachineSymbols[]): Promise<void> {
        if (this.spinState.inProgress) {
            return;
        }
        this.spinState.spinOutcome = [...outcome];
        this.spinState.inProgress = true;
        return new Promise<void>((resolve) => {
            gsap.to(this.spinState, {
                spinningSpeed: 100,
                duration: 0.5,
                ease: "back.in",
                onComplete: () => {
                    resolve();
                }
            })
        })
    }

    public beginStoppingSpin(): void {
        if (!this.spinState.inProgress) {
            return;
        }

        this.spinState.stopping = true;
    }

    private initializeSymbols(): void {
        this.symbols = [];


        for (let i = 0; i < 5; i++) {
            const symbol = new MachineSymbol(0, i * GLOBALS.REEL_SYMBOL_SPACING - 2 * GLOBALS.REEL_SYMBOL_SPACING, this.getRandomMachineSymbol());
            this.symbols.push(symbol);
            this.addChild(symbol);
        }
    }

    private getRandomMachineSymbol(): MachineSymbols {
        return GLOBALS.SYMBOLS[Math.floor(Math.random() * GLOBALS.SYMBOLS.length)]
    }
}