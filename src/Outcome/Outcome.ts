import { debugPanelProperties } from "../debugPanel";
import { GLOBALS, MachineSymbols } from "../globals";
import { LinesResults } from "./LinesResults";
import { WaysToWinResults } from "./WaysToWinResults";

export interface ResultsStrategy {
    getWinningResults: (
        outcome: MachineSymbols[][]
    ) => { x: number; y: number }[][];
}

export type ResultStrategyType = "lines" | "waysToWin";

export class Outcome {
    constructor() {}

    private static readonly COLS: number = 5;
    private static readonly ROWS: number = 3;

    private static strategies: { [key: string]: ResultsStrategy } = {
        lines: new LinesResults(this.COLS, this.ROWS),
        waysToWin: new WaysToWinResults(this.COLS, this.ROWS)
    };

    private static strategy: ResultsStrategy =
        this.getResultsStrategy("waysToWin");

    public static changeStrategy(strategy: ResultStrategyType): void {
        this.strategy = this.getResultsStrategy(strategy);
    }

    public static resolve(predefinedOutcome?: MachineSymbols[][]): {
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

    private static getResultsStrategy(
        strategy: ResultStrategyType
    ): ResultsStrategy {
        return this.strategies[strategy];
    }
}
