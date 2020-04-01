import {LocalDate} from 'util/date-time';

export class Urls {

  static readonly testimonials = '/testimonials';

  static signup(workshopKey: string, date: LocalDate): string {
    return `/signup/${workshopKey}/${date}`;
  }

  static workshop(workshopKey: string): string {
    return `/${workshopKey.toLowerCase()}-training`;
  }

  static schedule(workshopKey?: string): string {
    if (!!workshopKey) {
      return `/schedule/${workshopKey}`;
    } else {
      return `/schedule`;
    }
  }

  static readonly privateWorkshops = '/privateWorkshops';

}