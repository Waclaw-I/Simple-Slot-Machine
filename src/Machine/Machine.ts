import { Container, Graphics, Sprite } from "pixi.js";
import { Reel } from "./Reel";
import { GLOBALS, MachineSymbols } from "../globals";
import { wait } from "../utils";

export enum MachineState {
    Idle = "idle",
    Spinning = "spinning",
    ShowingResults = "showingResults"
}

export class Machine extends Container {
    private reelsBackground: Sprite;
    private machineFront: Sprite;
    private reels: Reel[];
    private reelsMask: Graphics;

    private state: MachineState = MachineState.Idle;

    constructor() {
        super();

        this.initializeReelsBackground();
        this.initializeReelsMask();
        this.initializeReels();
        this.initializeMachineFront();

        window.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.reels[0].getSymbol(2).bump();
            }
        });
    }

    update(dt: number): void {
        this.reels.forEach((reel) => {
            reel.update(dt);
        });
    }

    public async spin(
        outcome: MachineSymbols[][],
        winningResults: { x: number; y: number }[][]
    ): Promise<void> {
        if (this.state === MachineState.Spinning) {
            return;
        }
        this.state = MachineState.Spinning;
        const promises: Promise<void>[] = [];
        for (let i = 0; i < 5; i++) {
            promises.push(this.reels[i].spin(outcome[i], 500));
            await wait(50);
        }
        await Promise.all(promises);
        // either show results or idle if there were no winning symbols
        this.state = MachineState.ShowingResults;
        for (const result of winningResults) {
            await this.highlightResult(result);
        }
        this.state = MachineState.Idle;
    }

    public isSpinning(): boolean {
        return this.state === MachineState.Spinning;
    }

    private async highlightResult(
        result: { x: number; y: number }[]
    ): Promise<void> {
        const promises: Promise<void>[] = [];
        for (const { x, y } of result) {
            promises.push(this.reels[x].getSymbol(y).bump());
        }
        await Promise.all(promises);
    }

    private initializeReelsBackground(): void {
        this.reelsBackground = Sprite.from("reels_base");
        this.reelsBackground.anchor.set(0.5);

        this.addChild(this.reelsBackground);
    }

    private initializeMachineFront(): void {
        this.machineFront = Sprite.from("machine_front");
        this.machineFront.anchor.set(0.5);
        this.machineFront.scale.set(1.025, 1.1);
        this.machineFront.position.set(-140, -125);

        this.addChild(this.machineFront);
    }

    private initializeReelsMask(): void {
        this.reelsMask = new Graphics();
        this.reelsMask.rect(-500, -289, 1000, 578).fill(0xff0000);
        this.reelsMask.alpha = 0.5;
        this.addChild(this.reelsMask);
    }

    private initializeReels(): void {
        this.reels = [];
        for (let i = 0; i < 5; i++) {
            const reel = new Reel(GLOBALS.REEL_X_POS[i]);
            reel.mask = this.reelsMask;
            this.reels.push(reel);
        }

        this.addChild(...this.reels);
    }
}
