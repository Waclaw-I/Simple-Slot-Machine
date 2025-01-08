import { Application, Assets, Sprite, Container } from 'pixi.js';
import { Machine } from "./src/Machine/Machine";
import { urls } from "./img";
import { SpinButton } from "./src/SpinButton";
import { GLOBALS } from './src/Globals';

const screen = GLOBALS.SCREEN;

class MainScene extends Container {
    private _machine: Machine;
    private _spinButton: SpinButton;

    constructor() {
        super();

        const background = Sprite.from('background');
        this.addChild(background);

        const machine = new Machine();
        machine.position.set(screen.width * 0.5, screen.height * 0.5);
        this.addChild(machine);

        const spinButton = new SpinButton();
        spinButton.position.set(screen.width * 0.85, screen.height * 0.85);
        this.addChild(spinButton);

        this._machine = machine;
        this._spinButton = spinButton;
    }

    update(dt) {
        this._machine.update(dt);
        this._spinButton.update(dt);
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