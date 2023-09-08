export interface IActionService {
    getCurrentActionId(): string;
    setCurrentActionId(actionId: string): void;
    applyAction(actionId: string, tileIds: string[]): void;
    canDoDefaultAction: boolean;
    createDefaultAction(): string;
    allowActionAppliance(isAllowed: boolean): void;
}