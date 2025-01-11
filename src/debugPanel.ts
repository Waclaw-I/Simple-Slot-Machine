import * as dat from "dat.gui";
import { MachineSymbols } from "./globals";

export type DebugPanelOutcome =
    | "3 symbols"
    | "4 symbols"
    | "5 symbols"
    | "1 diagonal left to right"
    | "1 diagonal right to left"
    | "2 diagonals"
    | "horizontal and diagonal"
    | "vertical and diagonal"
    | "random";

export interface DebugPanelProperties {
    outcome: DebugPanelOutcome;
}

export const debugPanelProperties: DebugPanelProperties = {
    outcome: "random"
};

// TODO: remove this reduncancy with type somehow?
const outcomeOptions: DebugPanelOutcome[] = [
    "3 symbols",
    "4 symbols",
    "5 symbols",
    "1 diagonal left to right",
    "1 diagonal right to left",
    "2 diagonals",
    "horizontal and diagonal",
    "vertical and diagonal",
    "random"
];

export function getPredefinedSpin(): MachineSymbols[][] | undefined {
    switch (debugPanelProperties.outcome) {
        case "3 symbols": {
            return transposeMatrix([
                ["low1", "low2", "low3", "low4", "low1"],
                ["high1", "high1", "high1", "low1", "low1"],
                ["low4", "low1", "low2", "low3", "low4"]
            ]);
        }
        case "4 symbols": {
            return transposeMatrix([
                ["low1", "low2", "low3", "low4", "low1"],
                ["high1", "high1", "high1", "high1", "low1"],
                ["low4", "low1", "low2", "low3", "low4"]
            ]);
        }
        case "5 symbols": {
            return transposeMatrix([
                ["low1", "low2", "low3", "low4", "low1"],
                ["high1", "high1", "high1", "high1", "high1"],
                ["low4", "low1", "low2", "low3", "low4"]
            ]);
        }
        case "1 diagonal left to right": {
            return transposeMatrix([
                ["low1", "low2", "low3", "low4", "low1"],
                ["high1", "low1", "high3", "high3", "high1"],
                ["low4", "low2", "low1", "low3", "low4"]
            ]);
        }
        case "1 diagonal right to left": {
            return transposeMatrix([
                ["low2", "low2", "low1", "low4", "low1"],
                ["high1", "low1", "high3", "high3", "high1"],
                ["low1", "low2", "low3", "low3", "low4"]
            ]);
        }
        case "2 diagonals": {
            return transposeMatrix([
                ["low1", "low2", "low1", "low4", "low1"],
                ["high1", "low1", "high3", "high3", "high1"],
                ["low1", "low2", "low1", "low3", "low4"]
            ]);
        }
        case "horizontal and diagonal": {
            return transposeMatrix([
                ["high3", "low2", "high3", "low2", "high3"],
                ["high3", "high3", "high3", "high3", "high3"],
                ["high3", "low2", "low2", "low2", "high3"]
            ]);
        }
        case "vertical and diagonal": {
            return transposeMatrix([
                ["high3", "low2", "high3", "low2", "high3"],
                ["high3", "high3", "high3", "high3", "high3"],
                ["high3", "low2", "high3", "low2", "high3"]
            ]);
        }
        default: {
            break;
        }
    }
}

function transposeMatrix(matrix: MachineSymbols[][]): MachineSymbols[][] {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

export function createDebugPanel(): void {
    const gui = new dat.GUI();
    gui.add(debugPanelProperties, "outcome", outcomeOptions)
        .name("Outcome")
        .onChange((value) => {
            console.log(`selected: ${value}`);
        });
    gui.add;
}
