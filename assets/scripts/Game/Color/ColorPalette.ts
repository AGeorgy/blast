import { Color } from 'cc';
import { IColorPalette } from './IColorPalette';

export class ColorPalette implements IColorPalette {
    private _colors: Color[];

    constructor(colors: Color[]) {
        if (colors.length == 0) {
            this._colors = [Color.WHITE];
        }
        this._colors = colors;
    }

    getRandomColor(): Color {
        return this._colors[Math.floor(Math.random() * this._colors.length)];
    }

    // get countColors(): number {
    //     return this._colors.length;
    // }

    // getColor(index: number): Color {
    //     if (index < 0 || index >= this._colors.length) {
    //         return this._colors[0];
    //     }
    //     return this._colors[index];
    // }
}