import { MachineSymbols } from "../globals";
import { ResultsStrategy } from "./Outcome";

export class LinesResults implements ResultsStrategy {
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

        for (let y = 0; y < this.ROWS; y++) {
            for (let x = 0; x < this.COLS; x++) {
                // Check horizontal (right)
                const horizontal = this.checkDirection(outcome, x, y, 1, 0);
                if (horizontal) winningResults.push(horizontal);

                // Check vertical (down)
                const vertical = this.checkDirection(outcome, x, y, 0, 1);
                if (vertical) winningResults.push(vertical);

                // Check diagonal (down-right)
                const diagonalRight = this.checkDirection(outcome, x, y, 1, 1);
                if (diagonalRight) winningResults.push(diagonalRight);

                // Check diagonal (down-left)
                const diagonalLeft = this.checkDirection(outcome, x, y, -1, 1);
                if (diagonalLeft) winningResults.push(diagonalLeft);
            }
        }

        // Remove duplicate results
        const obsoleteResultsIndices: number[] = [];
        for (let i = 0; i < winningResults.length; i++) {
            for (let j = 0; j < winningResults.length; j++) {
                if (i === j) {
                    continue;
                }
                if (
                    this.isResultWithinOtherResult(
                        winningResults[i],
                        winningResults[j]
                    )
                ) {
                    obsoleteResultsIndices.push(i);
                }
            }
        }
        for (let i = obsoleteResultsIndices.length - 1; i >= 0; i--) {
            winningResults.splice(obsoleteResultsIndices[i], 1);
        }

        return winningResults;
    }

    private checkDirection(
        outcome: MachineSymbols[][],
        startX: number,
        startY: number,
        directionX: -1 | 0 | 1,
        directionY: -1 | 0 | 1
    ): { x: number; y: number }[] | null {
        const symbol = outcome[startX][startY];
        const sequence: { x: number; y: number }[] = [{ x: startX, y: startY }];

        for (let step = 1; step < 5; step++) {
            const x = startX + step * directionX;
            const y = startY + step * directionY;

            if (
                y < 0 ||
                y >= this.ROWS ||
                x < 0 ||
                x >= this.COLS ||
                outcome[x][y] !== symbol
            ) {
                break;
            }
            sequence.push({ x, y });
        }

        return sequence.length >= 3 ? sequence : null;
    }

    private isResultWithinOtherResult(
        result1: { x: number; y: number }[],
        result2: { x: number; y: number }[]
    ): boolean {
        const subArrays: { x: number; y: number }[][] = [];
        for (let i = 0; i < 2; i++) {
            subArrays.push(result2.slice(i));
        }
        for (const subArray of subArrays) {
            let includes = true;
            if (result1.length > subArray.length) {
                continue;
            }
            for (let i = 0; i < result1.length; i++) {
                if (
                    result1[i].x !== subArray[i].x ||
                    result1[i].y !== subArray[i].y
                ) {
                    includes = false;
                    break;
                }
            }
            if (includes) {
                return true;
            }
        }
        return false;
    }
}
