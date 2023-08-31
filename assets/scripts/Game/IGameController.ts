import { ISetState } from "./ISetState";

export interface IGameController extends ISetState {
    update(): unknown;
}