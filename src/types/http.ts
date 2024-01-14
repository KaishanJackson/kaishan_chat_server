import { ERROR_CODE, SUCCESS_CODE } from "./code"

export interface ServerResponse<T> {
    code: ERROR_CODE | SUCCESS_CODE;
    message: string;
    data: T
}