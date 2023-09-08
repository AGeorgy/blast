export interface IInputMode {
    readonly tileIds: string[];
    readonly actionId: string;
    readonly rank: number;
    readonly isValid: boolean;
    registerInput(tileId: string): void;
}