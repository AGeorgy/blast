import { ColorRegistry } from "./Model/ColorRegistry";

export interface IColorStore {
    getColor(id: string): ColorRegistry;
    getAllColors(): ColorRegistry[];
    addColor(colorRegistry: ColorRegistry): void;
}