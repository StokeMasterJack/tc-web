import moment from 'moment';
import * as service from "./service";
import {Int} from './util/ints';
import {LocalDate, today} from './util/date-time';
import {spaRedir} from './util/ssutil';
import {ensure} from './util/ass';
import {Urls} from './util/globals';

export interface Outline {
  nodes: ONode[];
  title: string;
  subtitle: string;
}

export interface ONode {
  id: number;
  parent_id: number;
  content: string;
  tasks: number[];
  notes: ONote[];
  tags: any;
}

export interface ONote {
  id: number;
  comment: string;
}

export type EventStatus = 'SoldOut' | 'Complete' | 'Open' | 'Loading';

export interface DEvent {
  readonly workshopKey: string;
  readonly date: LocalDate;
  readonly status?: string;
}

export class CEvent {

  readonly d: DEvent;
  private _workshop?: CWorkshop;

  constructor(d: DEvent) {
    this.d = d;
  }

  get workshopKey(): string {
    return this.d.workshopKey;
  }

  get date(): LocalDate {
    return this.d.date;
  }


  get leadTime(): Int {
    return this.workshop.leadTime;
  }

  get workshop(): CWorkshop {
    if (!this._workshop) {
      this._workshop = service.loadWorkshopSync(this.workshopKey);
    }
    return ensure(this._workshop);
  }

  get days(): Int {
    return this.workshop.days;
  }

  get key(): string {
    return this.workshopKey + '/' + this.date;
  }

  get prepDate(): LocalDate {
    return moment(this.date).add(-this.leadTime, 'days').format('YYYY-MM-DD');
  }

  /**
   * exclusive
   */
  get isBeforePrepDate() {
    return today() < this.prepDate;
  }

  /**
   * exclusive
   */
  get isBeforeStartDate() {
    return today() < this.startDate;
  }

  /**
   * exclusive
   */
  get isPastEndDate() {
    return today() > this.endDate;
  }

  get isComplete() {
    return this.isPastEndDate;
  }

  get isInPrepWindow() {
    return today() >= this.prepDate && today() < this.startDate;
  }

  get isInWorkshopWindow() {
    return today() >= this.startDate && today() <= this.endDate;
  }

  get startDate(): LocalDate {
    return this.date;
  }

  get endDate(): LocalDate {
    return moment(this.date).add(this.days - 1, 'days').format('YYYY-MM-DD');
  }

  startDateFormatted(format: string = 'ddd MMM D'): string {
    return moment(this.startDate).format(format);
  }

  endDateFormatted(format: string = 'ddd MMM D'): string {
    return moment(this.endDate).format(format);
  }

  get urlSignup(): string {
    return Urls.signup(this.workshopKey, this.date);
  }

  redirSignup = () => spaRedir(this.urlSignup);

  get location(): string {
    return `San Clemente, CA`;
  }

  computeStatus(signups?: ReadonlyArray<Signup>): EventStatus {
    if (this.isBeforePrepDate) {
      return 'Open';
    } else if (this.isInPrepWindow) {
      if (signups === undefined) {
        return 'Loading';
      } else {
        const signupCount = signups.length;
        if (signupCount === 0) {
          return 'SoldOut';
        } else {
          return 'Open';
        }
      }
    } else if (this.isInWorkshopWindow) {
      return 'SoldOut';
    } else if (this.isPastEndDate) {
      return 'Complete';
    } else {
      throw Error();
    }
  }
}


export type WorkshopKey = string;

export interface DWorkshop {
  readonly key: WorkshopKey;
  readonly  title: string;
  readonly price: number;
  readonly days: number;
  readonly leadTime: number;
  readonly homePage: boolean;
}

export class CWorkshop {
  readonly key: WorkshopKey;
  readonly title: string;
  readonly price: number;
  readonly days: number;
  readonly leadTime: number;
  readonly homePage: boolean;

  constructor(d: DWorkshop) {
    this.key = d.key;
    this.title = d.title;
    this.price = d.price;
    this.days = d.days;
    this.leadTime = d.leadTime;
    this.homePage = d.homePage;
  }

  get minDate(): LocalDate {
    return moment().add(this.leadTime, 'days').format('YYYY-MM-DD');
  }

  get subtitle(): string {
    return `${this.days}-day hands-on workshop`;
  }

  //https://smart-soft.com/flutter-training
  get url(): string {
    return Urls.workshop(this.key);
  }
}

export interface Signup {
  id?: string,
  workshopKey: string,  //react | kotlin | javascript | css
  date: string,
  name: string,
  company: string,
  phone: string,
  email: string,
  price: number,
  paid: number,
  balance: number
}


export interface Testimonial {
  id: number;
  text: string;
  student: string;
  company: string;
}

export interface Eval {
  date: LocalDate;
  name: string;
  workshop: string;
  love: string;
  hate: string;
}