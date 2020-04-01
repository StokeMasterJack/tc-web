export interface Rect {
    readonly width: number;
    readonly height: number;
}
export declare const rect: (width?: number, height?: number) => Rect;
export declare const rectCopy: (r: Rect) => Rect;
export declare const RectEmpty: Rect;
export declare const rectBounding: (n: HTMLElement) => Rect;
export declare const rectOffset: (n: HTMLElement) => Rect;
export declare const rectClient: (n: HTMLElement) => Rect;
export declare const rectScroll: (n: HTMLElement) => Rect;
export interface Box {
    readonly bounding: Rect;
    readonly offset: Rect;
    readonly client: Rect;
    readonly scroll: Rect;
}
export declare const boxNew: (bounding?: Rect, offset?: Rect, client?: Rect, scroll?: Rect) => Box;
export declare const BoxEmpty: Box;
export declare const boxFrom: (n: HTMLElement) => Box;
export declare const logBox: (b: Box, label?: string | undefined) => void;
export declare function assertDOMRect(r: DOMRect | ClientRect): DOMRect;
