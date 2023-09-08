export interface IInputMode {
    readonly tileIds: string[];
    readonly rank: number;
    readonly isValid: boolean;
    registerInput(tileId: string): void;
}