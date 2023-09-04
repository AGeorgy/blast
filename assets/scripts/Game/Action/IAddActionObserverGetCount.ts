import { IAddObserver } from "../Board/IAddObserver";
import { IAddActionGetCount } from "./IAddActionGetCount";

export interface IAddActionObserverGetCount extends IAddActionGetCount, IAddObserver { }
