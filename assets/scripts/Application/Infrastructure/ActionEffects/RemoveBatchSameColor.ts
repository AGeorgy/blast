import { IActionEffect } from "../Modules/Action/Model/IActionEffect";
import { ICanApplyDefaultAction } from "../Modules/Action/Model/ICanApplyDefaultAction";
import { IBoardService } from "../Modules/Board/IBoardService";
import { ITileService } from "../Modules/Tiles/ITileService";

export class RemoveBatchSameColor implements IActionEffect, ICanApplyDefaultAction {
    private readonly _minCellsInBath: number;
    private _boardService: IBoardService;
    private _tileService: ITileService;

    constructor(tileService: ITileService, boardService: IBoardService, minCellsInBath: number) {
        this._tileService = tileService;
        this._boardService = boardService;
        this._minCellsInBath = minCellsInBath;
    }

    applyEffect(tileIds: string[]): void {
        console.log("ActionRemoveBatchSameColor applyEffect");

        let board = this._boardService.getBoard();
        let slotIdsToRemove: string[] = [];

        for (let index = 0; index < tileIds.length; index++) {
            const tileId = tileIds[index];
            let tile = this._tileService.getTileById(tileId);

            const slot = this._boardService.getSlotById(tile.slotId)
            let slotIdsTo = this.getSlotIdsInRadiusWithColor(board.xMax, board.yMax, slot.x, slot.y, tile.colorId);

            if (slotIdsTo.size >= this._minCellsInBath) {
                slotIdsToRemove = slotIdsToRemove.concat(Array.from(slotIdsTo));
                continue;
            }
        }

        this._boardService.removeSlotsById(slotIdsToRemove);
    }

    canApplyDefaultAction(): boolean {
        console.log("ActionRemoveBatchSameColor canApply");

        let board = this._boardService.getBoard();

        for (let y = 0; y < board.yMax; y++) {
            for (let x = 0; x < board.xMax; x++) {
                if (this.canApply(board.xMax, board.yMax, x, y)) {
                    return true;
                }
            }
        }
        return false;
    }

    private canApply(xMax: number, yMax: number, x: number, y: number): boolean {
        let slot = this._boardService.getSlotByPos(x, y)
        if (slot.isEmpty) {
            return false;
        }

        let tile = this._tileService.getTileBySlotId(slot.id);

        const tilesToRemove = this.getSlotIdsInRadiusWithColor(xMax, yMax, x, y, tile.colorId);
        if (tilesToRemove.size >= this._minCellsInBath) {
            return true;
        }
        return false;
    }

    private getSlotIdsInRadiusWithColor(xMax: number, yMax: number, x: number, y: number, colorId: string): Set<string> {
        const slotsToRemove = new Set<string>();
        const tilesToCheck = [{ x: x, y: y }];
        const visited = new Set<string>();

        while (tilesToCheck.length > 0) {
            const tileToCheck = tilesToCheck.shift();
            const key = `${tileToCheck.x},${tileToCheck.y}`;

            if (!visited.has(key)) {
                let slot = this._boardService.getSlotByPos(tileToCheck.x, tileToCheck.y)
                if (slot.isEmpty) {
                    continue;
                }

                let tile = this._tileService.getTileBySlotId(slot.id)
                if (colorId === tile.colorId) {
                    visited.add(key);
                    slotsToRemove.add(slot.id);
                    tilesToCheck.push(...this.getNeighbours(xMax, yMax, tileToCheck.x, tileToCheck.y));
                }
            }
        }

        return slotsToRemove;
    }

    private getNeighbours(xMax: number, yMax: number, x: number, y: number): { x: number, y: number }[] {
        let neighbours: { x: number, y: number }[] = [];

        if (x > 0) {
            neighbours.push({ x: x - 1, y: y });
        }
        if (x < xMax - 1) {
            neighbours.push({ x: x + 1, y: y });
        }
        if (y > 0) {
            neighbours.push({ x: x, y: y - 1 });
        }
        if (y < yMax - 1) {
            neighbours.push({ x: x, y: y + 1 });
        }

        return neighbours;
    }
}