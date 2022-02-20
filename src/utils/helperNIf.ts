import { isEmpty as isEmptyLodash } from "lodash";

export type TF<T> = {
    "true": T,
    "false": T,
}

export type StringKeys<T> = {
    [key: string]: T,
}
export type NumberKeys<T> = {
    [key: number]: T,
}
export const isEmpty = (value: boolean): keyof TF<any> => new BoolClass(value).toString();

class BoolClass extends Boolean {
    toString(): keyof TF<any> {
        return isEmptyLodash(this) ? "true" : "false";
    }
}