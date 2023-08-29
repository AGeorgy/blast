
export interface IStartGameSequenceAndUpdate {
    readonly isStarted: boolean
    startSequance(): void
    update(): void
}