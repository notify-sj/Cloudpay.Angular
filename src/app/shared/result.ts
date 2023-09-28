export interface Result<T> {
    data?: T;
    message?: string;
    status?: string;
}