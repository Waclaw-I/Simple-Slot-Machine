import { GLOBALS, MachineSymbols } from './globals';

export class Outcome {
    constructor() {}

    static resolve(): MachineSymbols[][] {
        const columns = 5;
        const rows = 3;
        const symbols = GLOBALS.SYMBOLS;

        const outcome: MachineSymbols[][] = [];
        for (let i = 0; i < columns; i++) {
            const column = [];
            for (let j = 0; j < rows; j++) {
                column.push(symbols[Math.floor(Math.random() * symbols.length)]);
            }
            outcome.push(column);
        }
        return outcome;
    }
}