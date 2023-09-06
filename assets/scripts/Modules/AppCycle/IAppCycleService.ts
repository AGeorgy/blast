export interface IAppCycleService {
    createAppState(): void;
    setStateToGame(): boolean;
    setStateToGameOver(): boolean;
}