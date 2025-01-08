import { Container, Sprite } from 'pixi.js';

/**
 * Not named simply "Symbol" due to js Symbols
 */
export class MachineSymbol extends Container {

    private image: Sprite;

    constructor(x: number, y: number, textureKey: string) {
        super();

        this.image = Sprite.from(textureKey);
        this.image.x = x;
        this.image.y = y;
        this.image.anchor.set(0.5);
        this.addChild(this.image);
    }
}