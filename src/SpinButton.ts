import {Container, Sprite} from "pixi.js";

export enum SpinButtonEvent {
    Pressed = 'pressed'
}
export class SpinButton extends Container {
    constructor() {
        super();

        const button = Sprite.from('spin_btn_normal');
        button.anchor.set(0.5);
        button.interactive = true;
        this.addChild(button);

        button.on('pointerdown', () => {
            this.emit(SpinButtonEvent.Pressed)
        });
    }

    update(dt: number): void {}
}