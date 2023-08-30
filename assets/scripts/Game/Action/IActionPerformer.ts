import { ISetAndPerformeAction } from "./ISetAndPerformeAction";

export interface IActionPerformer extends ISetAndPerformeAction {
    reset(): void;
}