import { IAddObserver } from "../API/IAddObserver";
import { IBoardLastChanged } from "./IBoardLastChanged";
import { IBoardReadData } from "./IBoardReadData";

export interface IBoardDataAndAddNotifier extends IBoardReadData, IBoardLastChanged, IAddObserver { }