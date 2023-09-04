import { IObserver } from "../../API/IObserver";

export interface IAddObserver {
    addObserver(observer: IObserver): void;
}