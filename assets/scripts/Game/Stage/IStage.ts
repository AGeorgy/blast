export interface IStage {
    setDoneCallback(callback: () => void): void;
    execute(): void;
}