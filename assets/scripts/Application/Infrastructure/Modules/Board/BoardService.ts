import { ISignalTrigger } from "../../../../Signal/Signal";
import { BoardReadySignal, FilledBoardSignal as FilledBoardSignal } from "./FilledBoardSignal";
import { IBoardService } from "./IBoardService";
import { IBoardStore } from "./IBoardStore";
import { ISlotStore } from "./ISlotStore";
import { Board } from "./Model/Board";
import { Slot } from "./Model/Slot";
import { SlotState } from "./Model/SlotState";
import { SlotsRemovedSignal } from "./SlotsRemovedSignal";
import { SlotsMovedSignal } from "./SlotsMovedSignal";

export class BoardService implements IBoardService {
    private _boardStore: IBoardStore;
    private _slotStore: ISlotStore;
    private _fillBoardDispatcher: ISignalTrigger<FilledBoardSignal>;
    private _boardReadyDispatcher: ISignalTrigger<BoardReadySignal>;
    private _slotsRemovedDispatcher: ISignalTrigger<SlotsRemovedSignal>;
    private _slotsMovedDispatcher: ISignalTrigger<SlotsMovedSignal>;

    constructor(boardStore: IBoardStore, slotStore: ISlotStore, fillBoardDispatcher: ISignalTrigger<FilledBoardSignal>,
        boardReadyDispatcher: ISignalTrigger<BoardReadySignal>, slotsRemovedDispatcher: ISignalTrigger<SlotsRemovedSignal>,
        slotsMovedDispatcher: ISignalTrigger<SlotsMovedSignal>) {
        this._boardStore = boardStore;
        this._slotStore = slotStore;
        this._fillBoardDispatcher = fillBoardDispatcher;
        this._boardReadyDispatcher = boardReadyDispatcher;
        this._slotsRemovedDispatcher = slotsRemovedDispatcher;
        this._slotsMovedDispatcher = slotsMovedDispatcher;
        this.createSlots();
    }

    removeRowSlots(slotId: string): void {
        let slot = this._slotStore.getSlot(slotId);
        let y = slot.y;
        let board = this._boardStore.getBoard();
        let slotIdsToRemove: string[] = [];

        for (let x = 0; x < board.xMax; x++) {
            let slotId = this._slotStore.getSlotId(x, y);
            let slot = this._slotStore.getSlot(slotId);
            slot.state = SlotState.Empty;
            this._slotStore.updateSlot(slot);
            slotIdsToRemove.push(slotId);
        }

        this._slotsRemovedDispatcher.trigger(new SlotsRemovedSignal(slotIdsToRemove));
    }

    removeColumnSlots(slotId: string): void {
        let slot = this._slotStore.getSlot(slotId);
        let x = slot.x;
        let board = this._boardStore.getBoard();
        let slotIdsToRemove: string[] = [];

        for (let y = 0; y < board.yMax; y++) {
            let slotId = this._slotStore.getSlotId(x, y);
            let slot = this._slotStore.getSlot(slotId);
            slot.state = SlotState.Empty;
            this._slotStore.updateSlot(slot);
            slotIdsToRemove.push(slotId);
        }

        this._slotsRemovedDispatcher.trigger(new SlotsRemovedSignal(slotIdsToRemove));
    }

    removeSlotsById(slotIdsToRemove: string[]): void {
        slotIdsToRemove.forEach(slotId => {
            let slot = this._slotStore.getSlot(slotId);
            slot.state = SlotState.Empty;
            this._slotStore.updateSlot(slot);
        });

        this._slotsRemovedDispatcher.trigger(new SlotsRemovedSignal(slotIdsToRemove));
    }

    getSlotByPos(x: number, y: number): Slot {
        let slotId = this._slotStore.getSlotId(x, y);
        return this._slotStore.getSlot(slotId);
    }

    getBoard(): Board {
        return this._boardStore.getBoard();
    }

    clearBoard(): void {
        this._slotStore.getAllSlotIds().forEach(slotId => {
            let slot = this._slotStore.getSlot(slotId);
            slot.state = SlotState.Empty;
            this._slotStore.updateSlot(slot);
        });
    }

    private createSlots(): void {
        let board = this._boardStore.getBoard();

        for (let y = 0; y < board.yMax; y++) {
            for (let x = 0; x < board.xMax; x++) {
                let slot = new Slot(crypto.randomUUID(), x, y, SlotState.Empty)
                this._slotStore.createSlot(slot, x, y);
            }
        }

        console.log("BoardService createSlots", board.xMax, board.yMax);
        this._boardReadyDispatcher.trigger(new BoardReadySignal(board.xMax, board.yMax));
    }

    getSlotById(slotId: string): Slot {
        return this._slotStore.getSlot(slotId);
    }

    removeSlots(slotsToRemove: { x: number; y: number; }[]): string[] {
        let removedSlotIds = slotsToRemove.map(({ x, y }) => {
            let slotId = this._slotStore.getSlotId(x, y);
            let slot = this._slotStore.getSlot(slotId);
            slot.state = SlotState.Empty;
            this._slotStore.updateSlot(slot);
            return slotId;
        });

        return removedSlotIds;
    }

    fillBoard(): void {
        let filledSlotIds: string[] = [];
        let board = this._boardStore.getBoard();

        console.log("fillBoard", board.xMax, board.yMax);
        for (let y = 0; y < board.yMax; y++) {
            for (let x = 0; x < board.xMax; x++) {
                let slotId = this._slotStore.getSlotId(x, y);
                let slot = this._slotStore.getSlot(slotId);
                if (slot.state === SlotState.Empty) {
                    slot.state = SlotState.Filled;
                    this._slotStore.updateSlot(slot);
                    filledSlotIds.push(slotId);
                }
            }
        }

        if (filledSlotIds.length > 0) {
            this._fillBoardDispatcher.trigger(new FilledBoardSignal(filledSlotIds));
        }
    }

    exchangeTiles(slotId1: string, slotId2: string): string[] {
        let slot1 = this._slotStore.getSlot(slotId1);
        let slot2 = this._slotStore.getSlot(slotId2);

        slot1.changePosition(slot2.x, slot2.y);
        slot2.changePosition(slot1.x, slot1.y);

        this._slotStore.updateSlot(slot1);
        this._slotStore.updateSlot(slot2);

        return [slotId1, slotId2];
    }

    shuffle(): string[] {
        let allSlotIds = this._slotStore.getAllSlotIds();

        let currentIndex = allSlotIds.length;

        while (currentIndex != 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            let slotId1 = allSlotIds[currentIndex];
            let slotId2 = allSlotIds[randomIndex];
            let slot1 = this._slotStore.getSlot(slotId1);
            let slot2 = this._slotStore.getSlot(slotId2);

            slot1.changePosition(slot2.x, slot2.y);
            slot2.changePosition(slot1.x, slot1.y);

            this._slotStore.updateSlot(slot1);
            this._slotStore.updateSlot(slot2);
        }

        return this._slotStore.getAllSlotIds();
    }

    // shiftDown(): void {
    //     console.log("Board shiftDown");
    //     const movedTiles = new Map<number, ITile>();
    //     for (let x = 0; x < this._xMax; x++) {
    //         let shiftsInRow = 0;
    //         for (let y = 0; y < this._yMax; y++) {
    //             const index = this.codePositionToIndex(x, y);
    //             while (this._tiles[index] === null && shiftsInRow + y < this._yMax) {
    //                 this.shiftRowDown(x, y, movedTiles);
    //                 shiftsInRow++;
    //             }
    //         }
    //     }

    //     this._lastChangedTiles = { change: TilesChange.Moved, tiles: Array.from(movedTiles.values()) };
    //     this.notifyObservers();
    // }

    shiftDown(): void {
        let movedSlotIds: Set<string> = new Set<string>();
        let board = this._boardStore.getBoard();

        for (let x = 0; x < board.xMax; x++) {
            let shiftsInRow = 0;
            for (let y = 0; y < board.yMax; y++) {
                let slotId = this._slotStore.getSlotId(x, y);
                let slot = this._slotStore.getSlot(slotId);
                while (slot.state === SlotState.Empty && shiftsInRow + y < board.yMax) {
                    this.shiftRowDown(x, y, board.yMax, movedSlotIds);
                    shiftsInRow++;
                }
            }
        }

        let positions = Array.from(movedSlotIds).map(slotId => {
            let slot = this._slotStore.getSlot(slotId);
            return { x: slot.x, y: slot.y };
        });
        console.log("shiftDown", movedSlotIds, positions);
        this._slotsMovedDispatcher.trigger(new SlotsMovedSignal(Array.from(movedSlotIds)));
    }

    private shiftRowDown(xPos: number, yPos: number, yMax: number, movedSlots: Set<string>): void {
        for (let y = yPos; y < yMax - 1; y++) {
            let slotId = this._slotStore.getSlotId(xPos, y);
            let slot = this._slotStore.getSlot(slotId);

            let upSlotId = this._slotStore.getSlotId(xPos, y + 1);
            let upSlot = this._slotStore.getSlot(upSlotId);

            upSlot.changePosition(xPos, y);
            slot.changePosition(xPos, y + 1);
            this._slotStore.updateSlotPos(upSlotId, xPos, y);
            this._slotStore.updateSlotPos(slotId, xPos, y + 1);

            if (upSlot.state === SlotState.Filled) {
                movedSlots.add(upSlotId);
            }
        }
    }

    // private shiftRowDown(xPos: number, yPos: number, movedTiles: Map<number, ITile>): void {
    //     for (let y = yPos; y < this._yMax - 1; y++) {
    //         const index = this.codePositionToIndex(xPos, y);
    //         const currentTile = this._tiles[index];

    //         const upIndex = this.codePositionToIndex(xPos, y + 1);
    //         const upTile = this._tiles[upIndex];

    //         this._tiles[upIndex] = currentTile;
    //         this._tiles[index] = upTile;
    //         if (upTile) {
    //             movedTiles.set(upTile.id, upTile);
    //             upTile.setPosition({ x: xPos, y: y });
    //         }
    //     }
    // }
}