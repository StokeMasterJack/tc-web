export declare function ensureValue<T>(value: T | undefined | null, fallback: T): T;
export declare function ensure<T>(value: T | undefined | null, errorMessage?: string): T;
export declare function assertDefinedAndNotNull<T>(value: T | undefined | null, errorMessage?: string): T;
export declare function spaRedir(url: string): void;
export declare function capFirstLetter(s: string): string;
/**
 * Contains at least 10 digits
 * 714 654 6550
 */
export declare function isValidPhoneNumber(ph: string): boolean;
export declare function formatCurrency(num: number): string;
export declare function params(obj: any): string;
