export declare class AssertionError extends Error {
    readonly msg?: string;
    readonly suffix?: string;
    constructor(msg?: string, suffix?: string);
    private static computeMessage;
    toLocaleString(): string;
    toString(): string;
}
export declare function assErr(msg?: string, suffix?: string): never;
export declare const ass: (t: boolean, m?: string | undefined) => undefined;
export declare const assBool: (v: any, m?: string | undefined) => boolean;
export declare const assNum: (v: any, m?: string | undefined, min?: number, max?: number) => number;
export declare const assStr: (v: any, m?: string | undefined, min?: number, max?: number) => string;
export declare const assFun: (v: any, m?: string | undefined) => string;
export declare const assUnd: (v: any, m?: string | undefined) => undefined;
export declare const assNull: (v: any, m?: string | undefined) => null;
export declare const assObj: <T>(v: any, m?: string | undefined) => T;
/**
 * assert !undefined and !null
 */
export declare function ensure<T>(value: T | undefined | null, msg?: string): T;
export declare function assDefinedAndNotNull<T>(value: T | undefined | null, msg?: string): T;
export declare function assNotNull<T>(v: T | undefined | null, m?: string): T | undefined;
export declare function assDefined<T>(v: T | undefined | null, m?: string): T | null;
export declare function assEq<T>(expected: T, actual: T, m?: string): T;
export declare function ensureValue<T>(value: T | undefined | null, fallbackValue: T): T;
export declare function fallback<T>(value: T | undefined | null, fallbackValue: T): T;
