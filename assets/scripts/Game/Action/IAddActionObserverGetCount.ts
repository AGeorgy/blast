import { IAddObserver } from "../API/IAddObserver";
import { IAddActionGetCount } from "./IAddActionGetCount";

export interface IAddActionObserverGetCount extends IAddActionGetCount, IAddObserver { }
