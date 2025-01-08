import {Container, Graphics, Sprite} from "pixi.js";
import { Reel } from './Reel';
import { GLOBALS } from '../Globals';

export class Machine extends Container {

    private reelsBackground: Sprite;

    private reels: Reel[];

    private reelsMask: Graphics;

    constructor() {
        super();

        this.initializeReelsBackground();
        this.initializeReelsMask();
        this.initializeReels();
    }

    update(dt: number): void {
        this.reels.forEach(reel => {
            reel.update(dt);
        })
    }

    private initializeReelsBackground(): void {
        this.reelsBackground = Sprite.from('reels_base');
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