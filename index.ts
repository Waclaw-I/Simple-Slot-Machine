import { Application, Assets, Container } from "pixi.js";
import { Machine } from "./src/Machine/Machine";
import { urls } from "./img";
import { SpinButton, SpinButtonEvent } from "./src/SpinButton";
import { GLOBALS } from "./src/globals";
import { Outcome } from "./src/Outcome";
import { createDebugPanel, getPredefinedSpin } from "./src/debugPanel";

const screen = GLOBALS.SCREEN;

class MainScene extends Container {
    private machine: Machine;
    private spinButton: SpinButton;

    constructor() {
        super();

        createDebugPanel();

        this.machine = new Machine();

        this.machine.position.set(screen.width * 0.5, screen.height * 0.5);
        this.addChild(this.machine);

        this.spinButton = new SpinButton();
        this.spinButton.position.set(screen.width * 0.85, screen.height * 0.85);
        this.addChild(this.spinButton);

        this.bindEventHandlers();
    }

    public update(dt): void {
        this.machine.update(dt);
        this.spinButton.update(dt);
    }

    private bindEventHandlers(): void {
        this.spinButton.on(SpinButtonEvent.Clicked, async () => {
            if (this.machine.isSpinning()) {
                return;
            }
            const { outcome, winningResults } =
                Outcome.resolve(getPredefinedSpin());
            this.spinButton.lock(true);
            await this.machine.spin(outcome, winningResults);
            this.spinButton.lock(false);
        });
    }
}

class Game {
    public app: Application;

    constructor() {}

    async initialize(app: Application, urls: any) {
        this.app = app;
        await Assets.load(urls);
    }

    setScene(scene: Container) {
        this.app.stage = scene;
    }
}

(async () => {
    const app = new Application();
    await app.init({
        width: screen.width,
        height: screen.height,
        backgroundAlpha: 0
    });
    document.body.appendChild(app.canvas);

    const game = new Game();
    await game.initialize(app, urls);

    const main = new MainScene();
    game.setScene(main);

    app.ticker.add(({ deltaTime }) => {
        main.update(deltaTime);
    });
})();
