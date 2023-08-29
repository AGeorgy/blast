export interface IStage {
    readonly isStarted: boolean;
    readonly isDone: boolean;
    reset(): void;
    execute(): void;
}