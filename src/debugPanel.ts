import * as dat from "dat.gui";

const settings = {
    isChecked: false
};

export default function createDebugPanel(): void {
    const gui = new dat.GUI();

    gui.add(settings, "isChecked").name("Toggle Options");

    gui.updateDisplay();
}
