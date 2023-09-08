

export class DoubleClickInputMode implements IInpuatMode {
    private _clicks: { x: number, y: number }[];
    private _action: IAction;

    constructor(action: IAction) {
        this._clicks = [];
        this._action = action;
    }

    get rank(): number {
        return 2;
    }

    clickAt(x: number, y: number, resetMode: IResetMode, performAction: IPerformAction): void {
        this._clicks.push({ x, y });
        console.log("DoubleClickInputMode clickAt", x, y, this._clicks, this.isReady());
        if (this.isReady()) {
            resetMode.resetMode();
            performAction.performActionOnCellAt(this._clicks, this._action);
        }
    }

    private isReady(): boolean {
        return this._clicks.length >= 2;
    }
}