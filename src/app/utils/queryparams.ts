export class Queryparams {
    
    constructor(public type: QueryParamType, public key: string, public value: any) {
    }
}

export enum QueryParamType {
    URL,
    QUERY
}