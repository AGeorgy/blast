import { IBoardService } from "./IBoardService";
import { IBoardStore } from "./IBoardStore";
import { ISlotStore } from "./ISlotStore";
import { Board } from "./Model/Board";
import { SlotState } from "./Model/SlotState";

export class BoardService implements IBoardService {
    private _boardStore: IBoardStore;
    private _slotStore: ISlotStore;

    constructor(boardStore: IBoardStore, slotStore: ISlotStore) {
        this._boardStore = boardStore;
        this._slotStore = slotStore;
    }

    clearBoard(): void {
        this._slotStore.getAllSlotIds().forEach(slotId => {
            let slot = this._slotStore.getSlot(slotId);
            slot.state = SlotState.Empty;
            this._slotStore.updateSlot(slot);
        });
    }

    createBoard(xMax: number, yMax: number): void {
        let board = new Board(xMax, yMax);
        this._boardStore.updateBoard(board);
    }

    getSlotId(x: number, y: number): string {
        return this._slotStore.getSlotId(x, y);
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

    fillBoard(): string[] {
        let filledSlotIds: string[] = [];
        let board = this._boardStore.getBoard();

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

        return filledSlotIds;
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

    shiftDown(): string[] {
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

        return Array.from(movedSlotIds);
    }

    private shiftRowDown(xPos: number, yPos: number, yMax: number, movedTiles: Set<string>): void {
        for (let y = yPos; y < yMax - 1; y++) {
            let slotId = this._slotStore.getSlotId(xPos, y);
            let slot = this._slotStore.getSlot(slotId);

            let upSlotId = this._slotStore.getSlotId(xPos, y + 1);
            let upSlot = this._slotStore.getSlot(upSlotId);

            if (upSlot.state === SlotState.Filled) {
                upSlot.changePosition(xPos, y);
                slot.changePosition(xPos, y + 1);

                movedTiles.add(upSlotId);
            }
        }
    }
}