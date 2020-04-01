import {Int} from './ints';

export const trimLeading = (t: string, c: string): string => {
  return t.length > 0 && t.charAt(0) === c ? t.substr(1) : t;
};

export const trimTrailing = (t: string, c: string): string => {
  return t.length > 0 && t.charAt(t.length - 1) === c ? t.substr(0, t.length - 1) : t;
};

export const trimLeadingTrailing = (t: string, c: string): string => {
  return trimLeading(trimTrailing(t, c), c);
};


export function replaceAll(original: string, toReplace: string, replacement: string): string {
  return original.split(toReplace).join(replacement);
}

export function indent(original: string, depth: Int): string {
  const prefix = ''.padStart(depth * 4);
  return prefix + original;
}

export function capFirstLetter(s: string): string {
  if (s.length === 0) return s;
  const firstChar = s.substring(0, 1);
  const rest = s.substring(1);
  return firstChar.toUpperCase() + rest;
}

export function lpad(unpaddedString: string, padChar: string, desiredFinalLength: number): string {
  let str = unpaddedString;
  while (str.length < desiredFinalLength)
    str = padChar + str;
  return str;
}