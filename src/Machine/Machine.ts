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
    private reels: Reel[];
    private reelsMask: Graphics;

    private state: MachineState = MachineState.Idle;

    constructor() {
        super();

        this.initializeReelsBackground();
        this.initializeReelsMask();
        this.initializeReels();
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
        console.log(winningResults);
        this.state = MachineState.Spinning;
        const promises: Promise<void>[] = [];
        for (let i = 0; i < 5; i++) {
            promises.push(this.reels[i].spin(outcome[i], 500));
            await wait(50);
        }
        await Promise.all(promises);
        // either show results or idle if there were no winning symbols
        this.state = MachineState.ShowingResults;
    }

    public isSpinning(): boolean {
        return this.state === MachineState.Spinning;
    }

    private initializeReelsBackground(): void {
        this.reelsBackground = Sprite.from("reels_base");
        this.reelsBackground.anchor.set(0.5);

        this.addChild(this.reelsBackground);
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
