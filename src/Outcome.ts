import { GLOBALS, MachineSymbols } from './globals';

export class Outcome {
    constructor() {}

    private static readonly COLS: number = 5;
    private static readonly ROWS: number = 3;

    static resolve(): MachineSymbols[][] {
        const symbols = GLOBALS.SYMBOLS;

        const outcome: MachineSymbols[][] = [];
        for (let x = 0; x < this.COLS; x++) {
            const column = [];
            for (let y = 0; y < this.ROWS; y++) {
                column.push(symbols[Math.floor(Math.random() * symbols.length)]);
            }
            outcome.push(column);
        }
        console.log(this.getWinningResults(outcome));
        return outcome;
    }

    private static getWinningResults(outcome: MachineSymbols[][]): { x: number, y: number }[][] {
        const winningResults: { x: number, y: number }[][] = [];
    
        // Function to check a direction for matching symbols
        const checkDirection = (
            startX: number,
            startY: number,
            directionX: -1 | 0 | 1,
            directionY: -1 | 0 | 1
        ): { x: number, y: number }[] | null => {
            const symbol = outcome[startX][startY];
            const sequence: { x: number, y: number }[] = [{ x: startX, y: startY }];
    
            for (let step = 1; step < 5; step++) {
                const x = startX + step * directionX;
                const y = startY + step * directionY;
    
                if (y < 0 || y >= this.ROWS || x < 0 || x >= this.COLS || outcome[x][y] !== symbol) {
                    break;
                }
                sequence.push({ x, y });
            }
    
            return sequence.length >= 3 ? sequence : null;
        };
    
        for (let y = 0; y < this.ROWS; y++) {
            for (let x = 0; x < this.COLS; x++) {
                // Check horizontal (right)
                const horizontal = checkDirection(x, y, 1, 0);
                if (horizontal) winningResults.push(horizontal);
    
                // Check vertical (down)
                const vertical = checkDirection(x, y, 0, 1);
                if (vertical) winningResults.push(vertical);
    
                // Check diagonal (down-right)
                const diagonalRight = checkDirection(x, y, 1, 1);
                if (diagonalRight) winningResults.push(diagonalRight);
    
                // Check diagonal (down-left)
                const diagonalLeft = checkDirection(x, y, -1, 1);
                if (diagonalLeft) winningResults.push(diagonalLeft);
            }
        }
    
        return winningResults;
    }
}