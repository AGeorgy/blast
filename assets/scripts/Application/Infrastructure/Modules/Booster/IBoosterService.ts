import { Booster } from "./Model/Booster";

export interface IBoosterService {
    getBoosterById(boosterId: string): Booster;
    resetBoosters(): void;
}