import { _decorator, CCInteger, CCString, Color, Component } from 'cc';
import { IGameSettings } from './IGameSettings';
const { ccclass, property } = _decorator;

@ccclass('GameSettings')
export class GameSettings extends Component implements IGameSettings {
    @property(CCString)
    readonly loadingScreenName: string;
    @property(CCString)
    readonly gameScreenName: string;
    @property(CCString)
    readonly gameOverScreenName: string;
    @property(CCInteger)
    readonly boardMaxX: number = 5;
    @property(CCInteger)
    readonly boardMaxY: number = 5;
    @property([Color])
    readonly tileColors: Color[] = [];
    @property(CCInteger)
    readonly groupSizeForDefaultAction: number = 2;
    @property(CCInteger)
    readonly maxShuffleCount: number = 2;
    @property(CCInteger)
    readonly maxTurns: number = 10;
    @property(CCInteger)
    readonly targetScore: number = 100;
}

