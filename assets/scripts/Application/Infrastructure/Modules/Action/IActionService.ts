export interface IActionService {
    applyAction(actionId: string, tileIds: string[]): void;
    canDoDefaultAction: boolean;
    createDefaultAction(): string;
    allowActionAppliance(isAllowed: boolean): void;
}