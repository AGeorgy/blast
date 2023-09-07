export interface IActionService {
    canDoDefaultAction: boolean;
    createDefaultAction(): string;
    allowActionAppliance(isAllowed: boolean): void;
}