import {Container, Sprite} from "pixi.js";
import { Reel } from './Reel';
import { GLOBALS } from '../Globals';

export class Machine extends Container {

    private reelsBackground: Sprite;

    private reels: Reel[];

    constructor() {
        super();


        this.initializeReelsBackground();
        this.initializeReels();
    }

    update(dt: number): void {
    }

    private initializeReelsBackground(): void {
        this.reelsBackground = Sprite.from('reels_base');
        this.reelsBackground.anchor.set(0.5);

        this.addChild(this.reelsBackground);
    }

    private initializeReels(): void {
        this.reels = [];
        for (let i = 0; i < 5; i++) {
            const reel = new Reel(GLOBALS.REEL_X_POS[i]);
            this.reels.push(reel);
        }

        this.addChild(...this.reels);
    }
}