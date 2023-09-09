import { Color } from "cc";
import { ColorRegistry } from "./Model/ColorRegistry";
import { IColorStore } from "./IColorStore";
import { IColorPaletteService } from "./IColorPaletteService";

export class ColorPaletteService implements IColorPaletteService {
    private _store: IColorStore;

    constructor(store: IColorStore, colors: Color[]) {
        this._store = store;
        this.addColors(colors);
    }

    getRandomColor(): ColorRegistry {
        let colors = this._store.getAllColors();
        let index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }

    private addColors(colors: Color[]): void {
        colors.forEach(color => this.addColor(color));
    }

    private addColor(color: Color): void {
        let colorRegistry = new ColorRegistry(crypto.randomUUID(), color);
        this._store.addColor(colorRegistry);
    }
}