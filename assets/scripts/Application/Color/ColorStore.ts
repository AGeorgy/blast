import { IColorStore } from "../Modules/Color/IColorStore";
import { ColorRegistry } from "../Modules/Color/Model/ColorRegistry";

export class ColorStore implements IColorStore {
    private _colors: Map<string, ColorRegistry> = new Map<string, ColorRegistry>();

    getColor(id: string): ColorRegistry {
        if (!this._colors.has(id)) {
            throw new Error(`Color with id ${id} does not exist.`);
        }
        return this._colors.get(id);
    }

    getRandomColor(): ColorRegistry {
        let index = Math.floor(Math.random() * this._colors.size);
        return Array.from(this._colors.values())[index];
    }

    addColor(colorRegistry: ColorRegistry): void {
        this._colors.set(colorRegistry.id, colorRegistry);
    }
}