import { IBoosterService } from "./IBoosterService";
import { IBoosterStore } from "./IBoosterStore";

export class BoosterService implements IBoosterService {
    private _store: IBoosterStore;

    constructor(store: IBoosterStore) {
        this._store = store;
    }

    resetBoosters(): void {
        let boosterIds = this._store.getAllBoosterIds();
        boosterIds.forEach((boosterId) => {
            let booster = this._store.getBoosterById(boosterId);
            booster.resetAmount();
        });
    }

}