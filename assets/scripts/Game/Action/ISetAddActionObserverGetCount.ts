import { IAddObserver } from "../Board/IAddObserver";
import { IAddActionGetCount } from "./IAddActionGetCount";
import { ISetAction } from "./ISetAction";

export interface ISetAddActionObserverGetCount extends IAddActionGetCount, IAddObserver, ISetAction { }
