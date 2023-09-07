import { ColorRegistry } from "./Model/ColorRegistry";

export class RandomColorPalette {
    static getRandomColor(colors: ColorRegistry[]): ColorRegistry {
        let index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }
}