import { IActionEffect } from "../Modules/Action/Model/IActionEffect";
import { IBoardService } from "../Modules/Board/IBoardService";
import { ITileService } from "../Modules/Tiles/ITileService";

export class ActionBomb implements IActionEffect {
    private readonly _radius: number;
    private _boardService: IBoardService;
    private _tileService: ITileService;

    constructor(tileService: ITileService, boardService: IBoardService, radius: number) {
        this._tileService = tileService;
        this._boardService = boardService;
        this._radius = radius;
    }

    applyEffect(tileIds: string[]): void {
        console.log("ActioBomb execute", tileIds);
        let slotIdsToRemove: string[] = [];
        let board = this._boardService.getBoard();


        for (let index = 0; index < tileIds.length; index++) {
            const tileId = tileIds[index];
            let tile = this._tileService.getTileById(tileId);
            let slot = this._boardService.getSlotById(tile.slotId);

            slotIdsToRemove = slotIdsToRemove.concat(this.getSlotsInRadius(board.xMax, board.yMax, slot.x, slot.y, this._radius));
        }

        this._boardService.removeSlotsById(slotIdsToRemove);
    }

    private getSlotsInRadius(xMax: number, yMax: number, xStart: number, yStart: number, size: number): string[] {
        let x = 0;
        let y = 0;
        let direction = 0; // 0=RIGHT, 1=DOWN, 2=LEFT, 3=UP
        let chainSize = 1;

        x = xStart;
        y = yStart;
        size = size + 1;
        const slotIdsToRemove: string[] = [];

        for (let k = 1; k <= size - 1; k++) {
            for (let j = 0; j < (k < size - 1 ? 2 : 3); j++) {
                for (let i = 0; i < chainSize; i++) {

                    if (x >= 0 && x < xMax && y >= 0 && y < yMax) {
                        let slot = this._boardService.getSlotByPos(x, y);
                        slotIdsToRemove.push(slot.id);
                    }

                    switch (direction) {
                        case 0:
                            x++;
                            break;
                        case 1:
                            y--;
                            break;
                        case 2:
                            x--;
                            break;
                        case 3:
                            y++;
                            break;
                    }
                }
                direction = (direction + 1) % 4;
            }
            chainSize = chainSize + 1;
        }

        if (x >= 0 && x < xMax && y >= 0 && y < yMax) {
            let slot = this._boardService.getSlotByPos(x, y);
            slotIdsToRemove.push(slot.id);
        }

        return slotIdsToRemove;
    }
}