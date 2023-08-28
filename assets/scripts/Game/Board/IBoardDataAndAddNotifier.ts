import { IAddObserver } from "./IAddObserver";
import { IBoardLastChanged } from "./IBoardLastChanged";
import { IBoardReadData } from "./IBoardReadData";

export interface IBoardDataAndAddNotifier extends IBoardReadData, IBoardLastChanged, IAddObserver { }