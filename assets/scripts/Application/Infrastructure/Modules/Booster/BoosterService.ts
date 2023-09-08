import { IBoosterService } from "./IBoosterService";
import { IBoosterStore } from "./IBoosterStore";
import { Booster } from "./Model/Booster";

export class BoosterService implements IBoosterService {
    private _store: IBoosterStore;

    constructor(store: IBoosterStore) {
        this._store = store;
    }

    getBoosterById(boosterId: string): Booster {
        return this._store.getBoosterById(boosterId);
    }

    resetBoosters(): void {
        let boosterIds = this._store.getAllBoosterIds();
        boosterIds.forEach((boosterId) => {
            let booster = this._store.getBoosterById(boosterId);
            booster.resetAmount();
        });
    }
}