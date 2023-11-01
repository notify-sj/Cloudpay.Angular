export class Tab {
    private _active: boolean;
    private _outlet: string;
    constructor(public id: number, public label: string,
        public route: string[], public isDefault: boolean = false, public type: TabType = TabType.MAIN) { }

    set active(active: boolean) {
        this._active = active;
    }

    get active() {
        return this._active;
    }

    set outlet(outlet: string) {
        this._outlet = outlet;
    }

    get outlet() {
        return this._outlet;
    }
}

export enum TabType {
    MAIN,
    EMPLOYEE
}