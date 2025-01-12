import * as dat from "dat.gui";
import { MachineSymbols } from "./globals";
import { Outcome, ResultStrategyType } from "./Outcome/Outcome";

export type DebugPanelLinesOutcome =
    | "3 symbols"
    | "4 symbols"
    | "5 symbols"
    | "1 diagonal left to right"
    | "1 diagonal right to left"
    | "2 diagonals"
    | "horizontal and diagonal"
    | "vertical and diagonal"
    | "random";

export type DebugPanelWaysToWinOutcome =
    | "1 symbol"
    | "2 symbols"
    | "3 symbols"
    | "multiple in col"
    | "random";

export interface DebugPanelProperties {
    resultsStrategyType: ResultStrategyType;
    linesOutcome: DebugPanelLinesOutcome;
    waysToWinOutcome: DebugPanelWaysToWinOutcome;
    spinDuration: number;
    reelStopDelay: number;
}

export const debugPanelProperties: DebugPanelProperties = {
    resultsStrategyType: "waysToWin",
    linesOutcome: "random",
    waysToWinOutcome: "random",
    spinDuration: 500,
    reelStopDelay: 50
};

// TODO: remove this reduncancy with type somehow?
const waysToWinOutcomeOptions: DebugPanelWaysToWinOutcome[] = [
    "1 symbol",
    "2 symbols",
    "3 symbols",
    "multiple in col",
    "random"
];

const linesOutcomeOptions: DebugPanelLinesOutcome[] = [
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
    if (debugPanelProperties.resultsStrategyType === "lines") {
        switch (debugPanelProperties.linesOutcome) {
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
    if (debugPanelProperties.resultsStrategyType === "waysToWin") {
        switch (debugPanelProperties.waysToWinOutcome) {
            case "1 symbol": {
                return transposeMatrix([
                    ["high1", "high3", "low2", "low1", "high1"],
                    ["low2", "high1", "high1", "low4", "low1"],
                    ["low1", "high3", "low3", "low4", "low4"]
                ]);
            }
            case "2 symbols": {
                return transposeMatrix([
                    ["high1", "low2", "low2", "low1", "high1"],
                    ["low2", "high1", "high1", "low2", "low1"],
                    ["low1", "high3", "low3", "low4", "low4"]
                ]);
            }
            case "3 symbols": {
                return transposeMatrix([
                    ["high1", "low2", "low2", "low3", "high1"],
                    ["low2", "high1", "high1", "low2", "low1"],
                    ["low3", "low3", "low3", "low4", "low3"]
                ]);
            }
            case "multiple in col": {
                return transposeMatrix([
                    ["high1", "low2", "low2", "low3", "low3"],
                    ["high1", "high1", "high1", "low2", "high1"],
                    ["high1", "low3", "low3", "low2", "low3"]
                ]);
            }
            case "random": {
                break;
            }
        }
    }
}

function transposeMatrix(matrix: MachineSymbols[][]): MachineSymbols[][] {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

export function createDebugPanel(): void {
    const gui = new dat.GUI();
    gui.add(debugPanelProperties, "resultsStrategyType", ["lines", "waysToWin"])
        .name("Results Type:")
        .onChange(() => {
            console.log("changed");
            Outcome.changeStrategy(debugPanelProperties.resultsStrategyType);
        });
    gui.add(debugPanelProperties, "linesOutcome", linesOutcomeOptions).name(
        "Lines Outcome"
    );
    gui.add(
        debugPanelProperties,
        "waysToWinOutcome",
        waysToWinOutcomeOptions
    ).name("Ways To Win O.");
    gui.add(debugPanelProperties, "spinDuration", 350, 2500)
        .name("Spin Duration")
        .step(1);
    gui.add(debugPanelProperties, "reelStopDelay", 50, 250)
        .name("Reel Stop Delay")
        .step(1);
}
