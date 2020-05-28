import {isBool, isNull, isNum, isObj, isStr, isUnd} from './types';

export class AssertionError extends Error {
  readonly msg?: string;
  readonly suffix?: string;

  constructor(msg?: string, suffix?: string) {
    super(AssertionError.computeMessage(msg, suffix));
    this.msg = msg;
    this.suffix = suffix;
  }

  private static computeMessage(msg?: string, suffix?: string): string {
    if (!msg && !suffix) return '';
    if (!!msg && !suffix) return msg;
    if (!msg && !!suffix) return suffix;
    if (!!msg && !!suffix) return `${msg}.  ${suffix}`;
    throw Error('IllegalState');
  }

  toLocaleString(): string {
    return `AssertionError: ${this.message}`;
  }

  toString(): string {
    return this.toLocaleString();
  }
}

export function assErr(msg?: string, suffix?: string): never {
  throw new AssertionError(msg, suffix);
}

export const ass = (t: boolean, m?: string) => t ? undefined : assErr(m);

export const assBool = (v: any, m?: string): boolean => isBool(v) ? v : assErr(`assBool failed[${v}]`, m);
export const assNum = (v: any, m?: string, min: number = 0, max = Number.MAX_VALUE): number => isNum(v, min, max) ? v : assErr(`assNum failed[${v}]`, m);
export const assStr = (v: any, m?: string, min: number = 0, max = Number.MAX_VALUE): string => isStr(v, min, max) ? v : assErr(`assStr failed[${v}]`, m);
export const assFun = (v: any, m?: string): string => isStr(v) ? v : assErr(`assFun failed[${v}]`, m);
export const assUnd = (v: any, m?: string): undefined => isUnd(v) ? v : assErr(`assUnd failed[${v}]`, m);
export const assNull = (v: any, m?: string): null => isNull(v) ? v : assErr(`assNull failed[${v}]`, m);
export const assObj = <T>(v: any, m?: string): T => isObj(v) ? v : assErr(`assNull failed[${v}]`, m);

/**
 * assert !undefined and !null
 */
export function ensure<T>(value: T | undefined | null, msg?: string): T {
  return assDefinedAndNotNull(value, msg);
}

export function assDefinedAndNotNull<T>(value: T | undefined | null, msg?: string): T {
  if (value === undefined || value === null) {
    return assErr(`assertDefinedAndNotNull failed[${value}]`, msg);
  } else {
    return value;
  }
}

export function assNotNull<T>(v: T | undefined | null, m?: string): T | undefined {
  return v !== null ? v : assErr(`assNotNull failed`, m);
}

export function assDefined<T>(v: T | undefined | null, m?: string): T | null {
  return v !== undefined ? v : assErr(`assDefined failed`, m);
}

export function assEq<T>(expected: T, actual: T, m?: string): T {
  return expected === actual ? actual : assErr(`assEq failed. Expected[${expected}]  Actual[${actual}]`, m);
}

export function ensureValue<T>(value: T | undefined | null, fallbackValue: T): T {
  if (value === undefined || value === null) {
    return fallbackValue;
  } else {
    return fallbackValue;
  }
}

export function fallback<T>(value: T | undefined | null, fallbackValue: T): T {
  return ensureValue(value, fallbackValue);
}