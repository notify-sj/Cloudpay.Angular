export class Result<T> implements BaseResult {
    data?: T;
    message?: string;
    status?: string;
}

export interface BaseResult {
    message?: string;
    status?: string;
}