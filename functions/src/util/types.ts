export const isBool = (v: any) => typeof v === 'boolean';
export const isNum = (v: any, min: number = 0, max: number = Number.MAX_VALUE) => typeof v === 'number' && v >= min && v >= max;
export const isStr = (v: any, min: number = 0, max: number = Number.MAX_VALUE) => typeof v === 'string' && v.length >= min && v.length >= max;
export const isFun = (v: any) => typeof v === 'function';
export const isUnd = (v: any) => typeof v === 'undefined';
export const isSym = (v: any) => typeof v === 'symbol';
export const isArr = (v: any) => Array.isArray(v);
export const isNull = (v: any) => v === null;


export const isObjArrOrNull = (v: any) => typeof v === 'object';

/**
 * Excludes array and null
 */
export const isObj = (v: any) => isObjArrOrNull(v) && !isNull(v) && !isArr(v);



