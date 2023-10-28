export class Tab {
    private _active: boolean;
    constructor(public id: number, public label: string,
        public route: string[], public isDefault: boolean = false, public type: TabType = TabType.MAIN) { }

    set active(active: boolean) {
        this._active = active;
    }

    get active() {
        return this._active;
    }
}

export enum TabType {
    MAIN,
    EMPLOYEE
}