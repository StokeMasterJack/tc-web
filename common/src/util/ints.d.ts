export declare type Int = number;
export declare const roundToInt: (num: number) => number;
/**
 * strips any non-int chars
 */
export declare const parseIntSmart: (s?: string | undefined) => number | undefined;
export declare const strAsInt: (value: string) => number;
export declare const numAsInt: (num: number) => number;
export declare const assertInt: (num: number) => number;
export declare const isStrInt: (str?: string | null | undefined) => boolean;
export declare const isStrNumber: (str?: string | null | undefined) => boolean;
export declare const isNumInt: (num: number) => num is number;
export declare const isInt: (num: string | number) => boolean;
export declare const asInt: (num: string | number) => number;
export declare const toInt: (num: string | number) => number;
export declare const int: (num: string | number) => number;
export declare function incr(n: Int | number): Int;
