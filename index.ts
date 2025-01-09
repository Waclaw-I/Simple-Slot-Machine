import { Application, Assets, Sprite, Container } from 'pixi.js';
import { Machine } from "./src/Machine/Machine";
import { urls } from "./img";
import { SpinButton, SpinButtonEvent } from "./src/SpinButton";
import { GLOBALS } from './src/globals';
import { Outcome } from './src/Outcome';

const screen = GLOBALS.SCREEN;

class MainScene extends Container {
    private machine: Machine;
    private spinButton: SpinButton;

    constructor() {
        super();

        const background = Sprite.from('background');
        this.addChild(background);

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
        this.spinButton.on(SpinButtonEvent.Pressed, () => {
            this.machine.spin(Outcome.resolve());
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
    await app.init({width: screen.width, height: screen.height});
    document.body.appendChild(app.canvas);

    const game = new Game();
    await game.initialize(app, urls);

    const main = new MainScene();
    game.setScene(main);

    app.ticker.add(({deltaTime}) => {
        main.update(deltaTime);
    });
})();