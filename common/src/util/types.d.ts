export declare const isBool: (v: any) => boolean;
export declare const isNum: (v: any, min?: number, max?: number) => boolean;
export declare const isStr: (v: any, min?: number, max?: number) => boolean;
export declare const isFun: (v: any) => boolean;
export declare const isUnd: (v: any) => boolean;
export declare const isSym: (v: any) => boolean;
export declare const isArr: (v: any) => boolean;
export declare const isNull: (v: any) => boolean;
export declare const isObjArrOrNull: (v: any) => boolean;
/**
 * Excludes array and null
 */
export declare const isObj: (v: any) => boolean;
