import { GLOBALS, MachineSymbols } from "../globals";
import { LinesResults } from "./LinesResults";

export interface ResultsStrategy {
    getWinningResults: (
        outcome: MachineSymbols[][]
    ) => { x: number; y: number }[][];
}

export class Outcome {
    constructor() {}

    private static readonly COLS: number = 5;
    private static readonly ROWS: number = 3;

    private static strategy: ResultsStrategy = new LinesResults(
        this.COLS,
        this.ROWS
    );

    static resolve(predefinedOutcome?: MachineSymbols[][]): {
        outcome: MachineSymbols[][];
        winningResults: { x: number; y: number }[][];
    } {
        const symbols = GLOBALS.SYMBOLS;

        if (predefinedOutcome) {
            return {
                outcome: predefinedOutcome,
                winningResults:
                    this.strategy.getWinningResults(predefinedOutcome)
            };
        }
        const outcome: MachineSymbols[][] = [];
        for (let x = 0; x < this.COLS; x++) {
            const column = [];
            for (let y = 0; y < this.ROWS; y++) {
                column.push(
                    symbols[Math.floor(Math.random() * symbols.length)]
                );
            }
            outcome.push(column);
        }
        return {
            outcome,
            winningResults: this.strategy.getWinningResults(outcome)
        };
    }
}
