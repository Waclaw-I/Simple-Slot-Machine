import { MachineSymbols } from "../globals";
import { ResultsStrategy } from "./Outcome";

export class WaysToWinResults implements ResultsStrategy {
    private readonly COLS: number;
    private readonly ROWS: number;

    constructor(cols: number, rows: number) {
        this.COLS = cols;
        this.ROWS = rows;
    }

    public getWinningResults(
        outcome: MachineSymbols[][]
    ): { x: number; y: number }[][] {
        const winningResults: { x: number; y: number }[][] = [];

        // no need to make last 2 cols as starting points
        const checkedSymbols: MachineSymbols[] = [];
        for (let x = 0; x < this.COLS - 2; x++) {
            for (let y = 0; y < this.ROWS; y++) {
                const symbol = outcome[x][y];
                if (checkedSymbols.includes(symbol)) {
                    continue;
                }
                checkedSymbols.push(symbol);
                const result = this.checkSymbol(symbol, x, outcome);
                if (result.length > 0) {
                    winningResults.push(result);
                }
            }
        }

        return winningResults;
    }

    private checkSymbol(
        symbol: MachineSymbols,
        startingCol: number,
        outcome: MachineSymbols[][]
    ): { x: number; y: number }[] {
        const results: { x: number; y: number }[] = [];
        let columnsChecked = 0;
        for (let x = startingCol; x < this.COLS; x++) {
            let occuredInColumn = false;
            for (let y = 0; y < this.ROWS; y++) {
                if (outcome[x][y] === symbol) {
                    results.push({ x, y });
                    occuredInColumn = true;
                }
            }
            if (!occuredInColumn) {
                break;
            }
            columnsChecked++;
        }
        if (columnsChecked >= 3) {
            return results;
        }
        return [];
    }
}
