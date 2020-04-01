import { Int } from './ints';
export declare const trimLeading: (t: string, c: string) => string;
export declare const trimTrailing: (t: string, c: string) => string;
export declare const trimLeadingTrailing: (t: string, c: string) => string;
export declare function replaceAll(original: string, toReplace: string, replacement: string): string;
export declare function indent(original: string, depth: Int): string;
export declare function capFirstLetter(s: string): string;
export declare function lpad(unpaddedString: string, padChar: string, desiredFinalLength: number): string;
