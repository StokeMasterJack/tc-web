export type Int = number;

export const roundToInt = (num: number): Int => Math.round(num) as Int;

/**
 * strips any non-int chars
 */
export const parseIntSmart = (s?: string): Int | undefined => {
    if (!s) return undefined;
    // noinspection SuspiciousTypeOfGuard
    if (typeof s === 'string') {
        let ss: string = '';
        for (let i = 0; i < s.length; i++) {
            const char = s.charAt(i);
            if (isStrInt(char)) {
                ss += char;
            }
        }
        return parseInt(ss);
    } else {
        throw Error();
    }
};

export const strAsInt = (value: string): Int => {
    return Number.parseInt(value) as Int;
};

export const numAsInt = (num: number): Int => {
    if (isNumInt(num)) {
        return num;
    } else {
        throw Error(`Invalid Int value (error): ${num}`);
    }
};

export const assertInt = (num: number): Int => {
    if (isNumInt(num)) {
        return num;
    } else {
        throw Error(`Invalid Int value (error): ${num}`);
    }
};

export const isStrInt = (str?: string | null): boolean => {
    if (str === undefined) return false;
    if (str === null) return false;
    if (str === '') return false;
    for (let i = 0; i < str.length - 1; i++) {
        const c = str.charAt(i);
        const p = parseInt(c);
        if (isNaN(p)) return false;
    }
    return true;
};

export const isStrNumber = (str?: string | null): boolean => {
    if (str === undefined) return false;
    if (str === null) return false;
    if (str === '') return false;
    let decimalCount = 0;
    for (let i = 0; i < str.length - 1; i++) {
        const c = str.charAt(i);
        if (c === '.') {
            decimalCount++;
            if (decimalCount > 1) return false;
            continue;
        }
        const p = parseInt(c);
        if (isNaN(p)) return false;
    }
    return true;
};

export const isNumInt = (num: number): num is Int => num % 1 === 0;

export const isInt = (num: number | string): boolean => {
    switch (typeof num) {
        case 'number':
            return isNumInt(num as number);
        case 'string':
            return isStrInt(num as string);
    }
};

export const asInt = (num: number | string): Int => {
    switch (typeof num) {
        case 'number':
            return numAsInt(num as number);
        case 'string':
            return strAsInt(num as string);
    }
};

export const toInt = asInt;
export const int = asInt;

export function incr(n: Int | number): Int {
    const i = numAsInt(n);
    return numAsInt(i + 1);
}
