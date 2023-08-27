import { IObserver } from "./IObserver";

export interface IAddObserver {
    addObserver(observer: IObserver): void;
}