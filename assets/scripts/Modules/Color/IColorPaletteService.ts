import { ColorRegistry } from "./Model/ColorRegistry";

export interface IColorPaletteService {
    getRandomColor(): ColorRegistry;
}