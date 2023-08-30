import { Color } from 'cc';
import { IColorPalette } from './IColorPalette';

export class ColorPalette implements IColorPalette {
    private readonly _colors: Color[];

    constructor(colors: Color[] = [Color.WHITE]) {
        this._colors = colors;
    }

    getRandomColor(): Color {
        return this._colors[Math.floor(Math.random() * this._colors.length)];
    }
}