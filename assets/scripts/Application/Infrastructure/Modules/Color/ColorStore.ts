import { IColorStore } from "./IColorStore";
import { ColorRegistry } from "./Model/ColorRegistry";

export class ColorStore implements IColorStore {
    private _colors: Map<string, ColorRegistry> = new Map<string, ColorRegistry>();

    getAllColors(): ColorRegistry[] {
        return Array.from(this._colors.values());
    }

    getColor(id: string): ColorRegistry {
        if (!this._colors.has(id)) {
            throw new Error(`Color with id ${id} does not exist.`);
        }
        return this._colors.get(id);
    }

    addColor(colorRegistry: ColorRegistry): void {
        this._colors.set(colorRegistry.id, colorRegistry);
    }
}