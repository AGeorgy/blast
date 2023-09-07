import { Booster } from "./Model/Booster";

export interface IBoosterStore {
    getBoosterById(boosterId: string): Booster;
    getAllBoosterIds(): string[];
}