import moment, { Moment } from 'moment';
export declare const MinLocalDate: LocalDate;
export declare const MaxLocalDate: LocalDate;
export declare type LocalDate = string;
export declare type SDate = LocalDate;
export declare type LocalDateU4 = string;
export declare type LocalDateU2 = string;
export declare type LocalDateTime = string;
export declare type LocalTime = string;
export declare type YearMonth = string;
export declare type DtRangeName = 'ytd' | 'mtd' | 'all' | 'tmp';
export interface DtRange {
    d1: LocalDate | null;
    d2: LocalDate | null;
}
export declare type DtRange1 = [LocalDate | null, LocalDate | null];
export declare type DtRange2 = [LocalDateOrEmptyString, LocalDateOrEmptyString];
export declare type DtRangeFixed = [LocalDate, LocalDate];
export declare type LocalDateOrNull = LocalDate | null;
export declare type LocalDateOrEmptyString = LocalDate | '';
export declare const fixDtRange1: (r: [string | null, string | null]) => [string, string];
export declare const nullToMinDate: (d: string | null) => string;
export declare const nullToMaxDate: (d: string | null) => string;
export declare const nullToEmptyString: (d: string | null) => string;
export declare const fixDtRange1ToEmptyString: (r: [string | null, string | null]) => [string, string];
export interface WkRange {
    w1: Week | null;
    w2: Week | null;
}
export declare function getCurrentDateTime(): LocalDateTime;
export declare function getCurrentDate(): LocalDate;
export declare function assertLocalDateTime(dt?: any): LocalDateTime;
export declare function parseLocalDateTime(dt: string): moment.Moment;
export declare function diffLocalDateTimeInSeconds(dt2: LocalDateTime, dt1: LocalDateTime): number;
export declare function logCurrentDateTime(): void;
export declare function dtRangeFromName(name: DtRangeName): DtRange1;
export declare function firstDayOfMonth(): LocalDate;
export declare function firstDayOfYear(): LocalDate;
export declare function today(): LocalDate;
export declare function todayNow(): LocalDateTime;
export declare function dtFmt(date: LocalDate, fmtString: string): string;
export declare function dtFmtUiY4(date: LocalDate): LocalDateU4;
export declare function dtFmtUiY2(date: LocalDate): LocalDateU2;
export declare function dtGt(d1: LocalDate | null, d2: LocalDate | null): boolean;
export interface Week {
    week: number;
    year: number;
}
export interface WeekFull {
    week: number;
    year: number;
    d1: string;
    d2: string;
    weekDotYear: string;
}
export declare function getClosestNonPastMonday(date: LocalDate): LocalDate;
/**
 * return a number from 1 to 52
 * @param monday the week's start date
 */
export declare function getIsoWeekFromMonday(monday: LocalDate): number;
export declare function getIsoYearFromMonday(monday: LocalDate): number;
export declare function getWeekFromMonday(monday: LocalDate): Week;
export declare function assertMonday(date: LocalDate): void;
export declare function computeTwoYearsDescFrom(initMonday: LocalDate): Array<Week>;
export declare function computeTwoYearsAscFrom(initMonday: string): Array<Week>;
export declare function computeTwoYearsDescFromToday(): Array<Week>;
export declare function toWeekFull(week: Week): WeekFull;
export declare function getMonday(week: Week): LocalDate;
export declare function getSunday(week: Week): LocalDate;
export declare function getThursday(week: Week): LocalDate;
export declare function getWeekForDate(date: LocalDate): Week;
export declare function getD1(week: Week): LocalDate;
export declare function getD2(week: Week): LocalDate;
/**
 * @param week
 * @param n a number from 1..7
 */
export declare function getDN(week: Week, n: number): LocalDate;
export declare function weekToString(week: Week): string;
/**
 * @param week
 * @returns 2015-01
 */
export declare function weekToString2(week: Week): string;
export declare function computeCurrentWeek(): Week;
export declare function getDateRangeForWeek(week: Week): string[];
export declare function parseWeek(weekDotYear: string): Week;
export declare function weekParse2(weekDashYear: string): Week;
export declare function weekParse3(yearDashWeek: string): Week;
export declare function momentDateToWeek(momentDate: Moment): Week;
export declare function yearFromDate(momentDate: Moment): number;
export declare function week1ToNumber(week: Week | null): number;
export declare function week2ToNumber(week: Week | null): number;
export declare function gt(w1: Week | null, w2: Week | null): boolean;
export declare function gtEq(w1: Week | null, w2: Week | null): boolean;
export declare function ltEq(w1: Week | null, w2: Week | null): boolean;
export declare function lt(w1: Week | null, w2: Week | null): boolean;
export declare function isWeekInRange(w: Week, w1: Week | null, w2: Week | null): boolean;
export declare function getD1FromWkRange(wkRange: WkRange): LocalDate | null;
export declare function getD2FromWkRange(wkRange: WkRange): LocalDate | null;
export declare function dtRangeToWkRange(dtRange: DtRange): WkRange;
export declare function wkRangeToDtRange(wkRange: WkRange): DtRange;
