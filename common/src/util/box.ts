export interface Rect {
    readonly   width: number;
    readonly   height: number;
}

export const rect = (width: number = 0, height: number = 0): Rect => ({width, height});
export const rectCopy = (r: Rect): Rect => rect(r.width, r.height);
export const RectEmpty: Rect = Object.freeze<Rect>(rect());

export const rectBounding = (n: HTMLElement): Rect => rectCopy(n.getBoundingClientRect());
export const rectOffset = (n: HTMLElement): Rect => rect(n.offsetWidth, n.offsetHeight);
export const rectClient = (n: HTMLElement): Rect => rect(n.clientWidth, n.clientHeight);
export const rectScroll = (n: HTMLElement): Rect => rect(n.scrollWidth, n.scrollHeight);


export interface Box {
    readonly bounding: Rect,
    readonly  offset: Rect;
    readonly   client: Rect,
    readonly   scroll: Rect,
}

export const boxNew = (bounding: Rect = RectEmpty, offset: Rect = RectEmpty, client: Rect = RectEmpty, scroll: Rect = RectEmpty): Box => ({bounding, offset, client, scroll});
export const BoxEmpty: Box = Object.freeze<Box>(boxNew());
export const boxFrom = (n: HTMLElement): Box => boxNew(rectBounding(n), rectOffset(n), rectClient(n), rectScroll(n));


export const logBox = (b: Box, label?: string) => {
    if (label) {
        console.log(`Box ${label}: `);
    } else {
        console.log(`Box: `);
    }
    console.log(`  bounding: `, b.bounding);
    console.log(`  offset:   `, b.offset);
    console.log(`  client:   `, b.client);
    console.log(`  scroll:   `, b.scroll);
};



export function assertDOMRect(r: DOMRect | ClientRect): DOMRect {
    if ((r as any).x !== undefined) {
        return r as DOMRect;
    } else {
        throw Error();
    }
}