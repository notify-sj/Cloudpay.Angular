export class Tab {
    constructor(public id: number, public label: string, 
        public route: string[], public isDefault: boolean = false) { }
}