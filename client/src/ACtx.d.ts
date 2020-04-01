import { Context } from 'react';
import { LocalDate } from './util/date-time';
import { Theme } from '@material-ui/core';
export declare class Urls {
    static readonly testimonials = "/testimonials";
    static signup(workshopKey: string, date: LocalDate): string;
    static workshop(workshopKey: string): string;
    static schedule(workshopKey?: string): string;
    static readonly privateWorkshops = "/privateWorkshops";
}
export default class ACtx {
    readonly theme: Theme;
    constructor(theme: Theme);
    static _a?: Context<ACtx | null>;
    static readonly AContext: Context<ACtx | null>;
}
export declare function useACtx(): ACtx;
export declare function useSsTheme(): Theme;
