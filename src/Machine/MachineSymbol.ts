import { gsap } from "gsap";
import { Container, Sprite } from "pixi.js";

/**
 * Not named simply "Symbol" due to js Symbols
 */
export class MachineSymbol extends Container {
    private image: Sprite;

    constructor(x: number, y: number, textureKey: string) {
        super();

        this.image = Sprite.from(textureKey);
        this.x = x;
        this.y = y;
        this.image.anchor.set(0.5);
        this.addChild(this.image);
    }

    public setTexture(textureKey: string): void {
        this.image.texture = Sprite.from(textureKey).texture;
    }

    public async bump(): Promise<void> {
        return new Promise<void>((resolve) => {
            gsap.to(this.image.scale, {
                x: 1.3,
                y: 1.3,
                duration: 0.5,
                repeat: 1,
                yoyo: true,
                ease: "back.out"
                // onComplete: () => {
                //     resolve();
                // }
            });
        });
    }
}
