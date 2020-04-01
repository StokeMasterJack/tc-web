import {assStr} from './ass';
import {lpad} from './strings';
import moment, {Moment} from 'moment';

const fmtIso = 'YYYY-MM-DD[T]HH:mm:ss';     //props.initValue and onUpdateClockIn

export const MinLocalDate: LocalDate = '1900-01-01';
export const MaxLocalDate: LocalDate = '2200-01-01';

export type LocalDate = string;     //YYYY-MM-DD
export type SDate = LocalDate;      //YYYY-MM-DD
export type LocalDateU4 = string;   //MM/DD/YYYY  US 4-digit year
export type LocalDateU2 = string;   //MM/DD/YY    US 2-digit year

export type LocalDateTime = string;  // 2017-03-25T04:04:18
export type LocalTime = string;


export type YearMonth = string;

export type DtRangeName = 'ytd' | 'mtd' | 'all' | 'tmp';


export interface DtRange {
  d1: LocalDate | null;
  d2: LocalDate | null;
}


export type DtRange1 = [LocalDate | null, LocalDate | null];
export type DtRange2 = [LocalDateOrEmptyString, LocalDateOrEmptyString];
export type DtRangeFixed = [LocalDate, LocalDate];

export type LocalDateOrNull = LocalDate | null;
export type LocalDateOrEmptyString = LocalDate | '';

export const fixDtRange1 = (r: DtRange1): DtRangeFixed => [nullToMinDate(r[0]), nullToMaxDate(r[1])];

export const nullToMinDate = (d: LocalDateOrNull): LocalDate => !!d ? d : MinLocalDate;
export const nullToMaxDate = (d: LocalDateOrNull): LocalDate => !!d ? d : MaxLocalDate;

export const nullToEmptyString = (d: LocalDateOrNull): LocalDateOrEmptyString => !!d ? d : '';

export const fixDtRange1ToEmptyString = (r: DtRange1): DtRange2 => [nullToEmptyString(r[0]), nullToEmptyString(r[1])];

export interface WkRange {
  w1: Week | null;
  w2: Week | null;
}

export function getCurrentDateTime(): LocalDateTime {
  return moment().format(fmtIso);
}

export function getCurrentDate(): LocalDate {
  return moment().format('YYYY-MM-DD');
}

export function assertLocalDateTime(dt?: any): LocalDateTime {
  const s = assStr(dt);
  if (!s) throw Error(`Invalid data[s]`);
  const m = moment(s);
  if (!m.isValid()) throw Error(`Invalid data[s]`);
  return m.format(fmtIso);
}

export function parseLocalDateTime(dt: string): moment.Moment {
  return moment(dt, fmtIso);
}

export function diffLocalDateTimeInSeconds(dt2: LocalDateTime, dt1: LocalDateTime): number {
  const dtMoment1 = parseLocalDateTime(dt1);
  const dtMoment2 = parseLocalDateTime(dt2);
  const duration = moment.duration(dtMoment2.diff(dtMoment1));
  return duration.asSeconds();
}

export function logCurrentDateTime() {
  console.log(getCurrentDateTime());
}

export function dtRangeFromName(name: DtRangeName): DtRange1 {
  switch (name) {
    case 'ytd':
      return [firstDayOfYear(), today()];
    case 'mtd':
      return [firstDayOfMonth(), today()];
    case 'all':
      return ['', ''];
    default:
      throw Error(`Invalid dtRangeName[${name}]`);
  }
}

export function firstDayOfMonth(): LocalDate {
  return moment().format('YYYY-MM-[01]');
}

export function firstDayOfYear(): LocalDate {
  return moment().format('YYYY-[01]-[01]');
}

export function today(): LocalDate {
  return moment().format('YYYY-MM-DD');
}

export function todayNow(): LocalDateTime {
  return getCurrentDateTime();
}


export function dtFmt(date: LocalDate, fmtString: string): string {
  return moment(date).format(fmtString);
}

export function dtFmtUiY4(date: LocalDate): LocalDateU4 {
  return dtFmt(date, 'MM/DD/YYYY');
}

export function dtFmtUiY2(date: LocalDate): LocalDateU2 {
  return dtFmt(date, 'MM/DD/YY');
}

export function dtGt(d1: LocalDate | null, d2: LocalDate | null): boolean {
  if (!d1 && !d2) return false;
  else if (!d1) return false;
  else if (!d2) return true;
  return d1 > d2;
}


export interface Week {
  week: number;  //isoWeek: 1-52
  year: number;  //isoWeekYear: 2016
}

export interface WeekFull {
  week: number;   //isoWeek: 1-52
  year: number;   //isoWeekYear: 2016
  d1: string;     //date (always a monday)
  d2: string;     //date (always a sunday)
  weekDotYear: string; //52.2016
}

export function getClosestNonPastMonday(date: LocalDate): LocalDate {
  const wd: number = moment(date).isoWeekday();
  if (wd === 1) return date;
  return getClosestNonPastMonday(moment(date).add(1, 'days').format('YYYY-MM-DD'));
}

/**
 * return a number from 1 to 52
 * @param monday the week's start date
 */
export function getIsoWeekFromMonday(monday: LocalDate): number {
  let dd: moment.Moment = moment(monday);
  return dd.isoWeek();
}

/*
 From ISO Week Date spec: "Each week's year is the Gregorian year in which the Thursday falls."
 */
export function getIsoYearFromMonday(monday: LocalDate): number {
  let dd: moment.Moment = moment(monday);
  return dd.isoWeekYear();
}

export function getWeekFromMonday(monday: LocalDate): Week {
  const y = getIsoYearFromMonday(monday);
  const w = getIsoWeekFromMonday(monday);
  return {
    year: y,
    week: w
  };
}

export function assertMonday(date: LocalDate) {
  const wd = moment(date).isoWeekday();
  if (wd !== 1) throw new Error('IllegalState');
}

export function computeTwoYearsDescFrom(initMonday: LocalDate): Array<Week> {
  assertMonday(initMonday);
  let dd: moment.Moment = moment(initMonday);
  const a: Array<Week> = [];
  for (let i = 0; i < 104; i++) {
    const monday = dd.format('YYYY-MM-DD');
    const week: Week = getWeekFromMonday(monday);
    a.push(week);
    dd = dd.add(-1, 'weeks');
  }
  return a;
}

export function computeTwoYearsAscFrom(initMonday: string): Array<Week> {
  assertMonday(initMonday);
  let dd: Moment = moment(initMonday);
  const a: Array<Week> = [];
  for (let i = 0; i < 104; i++) {
    const monday = dd.format('YYYY-MM-DD');
    const week: Week = getWeekFromMonday(monday);
    a.push(week);
    dd = dd.add(1, 'weeks');
  }
  return a;
}

export function computeTwoYearsDescFromToday(): Array<Week> {
  const today = moment().format('YYYY-MM-DD');
  const todayMinusOneWeek = moment(today).add(7, 'days').format('YYYY-MM-DD');
  const monday: string = getClosestNonPastMonday(todayMinusOneWeek);
  return computeTwoYearsDescFrom(monday);
}

export function toWeekFull(week: Week): WeekFull {
  return {
    week: week.week,
    year: week.year,
    d1: getD1(week),
    d2: getD2(week),
    weekDotYear: weekToString(week)
  };
}

export function getMonday(week: Week): LocalDate {
  return getD1(week);
}

export function getSunday(week: Week): LocalDate {
  return getD2(week);
}

export function getThursday(week: Week): LocalDate {
  return getDN(week, 4);
}

export function getWeekForDate(date: LocalDate): Week {
  const mm = moment(date);
  const w = mm.isoWeek();
  const y = mm.isoWeekYear();
  return {year: y, week: w};
}

export function getD1(week: Week): LocalDate {
  const w: number = week.week;
  const y: number = week.year;
  return moment().day('Monday').isoWeekYear(y).isoWeek(w).format('YYYY-MM-DD');
}

export function getD2(week: Week): LocalDate {
  const d1 = getD1(week);
  return moment(d1).add(6, 'days').format('YYYY-MM-DD');
}


/**
 * @param week
 * @param n a number from 1..7
 */
export function getDN(week: Week, n: number): LocalDate {
  const d1 = getD1(week);
  const adder = n - 1;
  return moment(d1).add(adder, 'days').format('YYYY-MM-DD');
}

export function weekToString(week: Week) {
  return String(week.week) + '.' + String(week.year);
}

/**
 * @param week
 * @returns 2015-01
 */
export function weekToString2(week: Week) {
  return String(week.year) + '-' + lpad(String(week.week), '0', 2);
}

export function computeCurrentWeek(): Week {
  const w: number = moment().isoWeek();
  const y: number = moment().isoWeekYear();
  return {week: w, year: y};
}

export function getDateRangeForWeek(week: Week) {
  return [getD1(week), getD2(week)];
}

export function parseWeek(weekDotYear: string): Week {
  const a: Array<string> = weekDotYear.split('.');
  return {
    week: Number(a[0]),
    year: Number(a[1])
  };
}

export function weekParse2(weekDashYear: string): Week {
  const a: Array<string> = weekDashYear.split('-');
  return {
    year: Number(a[0]),
    week: Number(a[1])
  };
}

export function weekParse3(yearDashWeek: string): Week {
  const a: Array<string> = yearDashWeek.split('-');
  return {
    year: Number(a[0]),
    week: Number(a[1])
  };
}

export function momentDateToWeek(momentDate: Moment): Week {
  const y: number = yearFromDate(momentDate);
  const w: number = momentDate.week();
  return {
    week: w,
    year: y
  };
}

export function yearFromDate(momentDate: Moment): number {
  const year: number = momentDate.year();
  if (momentDate.week() === 1 && momentDate.month() === 11) {
    return year + 1;
  }
  return year;
}

export function week1ToNumber(week: Week | null): number {
  if (week === null) return 0;
  return week.year * 100 + week.week;
}

export function week2ToNumber(week: Week | null): number {
  if (week === null) return 100000000;
  return week.year * 100 + week.week;
}

export function gt(w1: Week | null, w2: Week | null): boolean {
  let n1 = week1ToNumber(w1);
  let n2 = week2ToNumber(w2);
  return n1 > n2;
}

export function gtEq(w1: Week | null, w2: Week | null): boolean {
  let n1 = week1ToNumber(w1);
  let n2 = week2ToNumber(w2);
  return n1 >= n2;
}

export function ltEq(w1: Week | null, w2: Week | null): boolean {
  let n1 = week1ToNumber(w1);
  let n2 = week2ToNumber(w2);
  return n1 <= n2;
}

export function lt(w1: Week | null, w2: Week | null): boolean {
  let n1 = week1ToNumber(w1);
  let n2 = week2ToNumber(w2);
  return n1 < n2;
}

export function isWeekInRange(w: Week, w1: Week | null, w2: Week | null): boolean {
  if (w1 === null && w2 !== null) return ltEq(w, w2);
  if (w1 !== null && w2 === null) return gtEq(w, w1);
  if (w1 === null && w2 === null) return true;
  return gtEq(w, w1) && ltEq(w, w2);
}

export function getD1FromWkRange(wkRange: WkRange): LocalDate | null {
  const w1 = wkRange.w1;
  if (!w1) return null;
  return getD1(w1);
}

export function getD2FromWkRange(wkRange: WkRange): LocalDate | null {
  const w2 = wkRange.w2;
  if (!w2) return null;
  return getD2(w2);
}

export function dtRangeToWkRange(dtRange: DtRange): WkRange {
  const d1 = dtRange.d1;
  const d2 = dtRange.d2;
  const w1 = !!d1 ? getWeekForDate(d1) : null;
  const w2 = !!d2 ? getWeekForDate(d2) : null;
  return {w1, w2};
}

export function wkRangeToDtRange(wkRange: WkRange): DtRange {
  const d1 = getD1FromWkRange(wkRange);
  const d2 = getD2FromWkRange(wkRange);
  return {d1, d2};
}