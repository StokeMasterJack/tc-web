import * as moment from "moment";

export interface Event {
  workshopKey: string;
  date: string;
  days: number;
  price: number;
}

export function eventStartDate(event: Event, format?: string) {
  if (format) {
    return moment(event.date).format(format);
  } else {
    return event.date;
  }
}

export function eventEndDate(event: Event, format?: string) {
  const d2 = moment(event.date).add(event.days - 1, "days").format("YYYY-MM-DD");
  if (format) {
    return moment(d2).format(format);
  } else {
    return d2;
  }
}

export interface Workshop {
  title: string;
}

export interface Signup {
  id?: string,
  eventId: string,
  name: string,
  companyName: string,
  phone: string,
  email: string
}

export interface Path {
  page: string,
  id: string
}