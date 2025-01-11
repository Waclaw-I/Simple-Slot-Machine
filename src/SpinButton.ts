import { Container, Sprite } from "pixi.js";

export enum SpinButtonEvent {
    Clicked = "clicked"
}
export class SpinButton extends Container {
    private button: Sprite;

    private state: "idle" | "hover" | "pressed" | "disabled" = "idle";
    constructor() {
        super();

        this.button = Sprite.from("spin_btn_normal");
        this.button.anchor.set(0.5);
        this.button.interactive = true;
        this.addChild(this.button);

        this.bindEventHandlers();
    }

    public update(dt: number): void {}

    private bindEventHandlers(): void {
        this.button.on("pointerdown", () => {
            if (this.state === "disabled") {
                return;
            }
            this.changeState("pressed");
        });
        this.button.on("pointerup", () => {
            if (this.state === "disabled") {
                return;
            }
            this.emit(SpinButtonEvent.Clicked);
        });
        this.button.on("pointerover", () => {
            if (this.state === "disabled") {
                return;
            }
            this.changeState("hover");
        });
        this.button.on("pointerout", () => {
            if (this.state === "disabled") {
                return;
            }
            this.changeState("idle");
        });
    }

    public lock(lock: boolean = true): void {
        if (lock) {
            this.changeState("disabled");
        } else {
            this.changeState("idle");
        }
    }

    private changeState(
        state: "idle" | "hover" | "pressed" | "disabled"
    ): void {
        if (this.state === state) {
            return;
        }
        this.state = state;
        let textureKey = "spin_btn_normal";
        switch (state) {
            case "idle":
                textureKey = "spin_btn_normal";
                break;
            case "hover":
                textureKey = "spin_btn_over";
                break;
            case "pressed":
                textureKey = "spin_btn_down";
                break;
            case "disabled":
                textureKey = "spin_btn_disabled";
                break;
        }

        this.button.texture = Sprite.from(textureKey).texture;
    }
}
