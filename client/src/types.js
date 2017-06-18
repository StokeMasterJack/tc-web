import * as moment from "moment"

export interface Event {
  workshopKey: string;
  date: string;
  days: number;
  price: number;
}

export function eventStartDate(date: string, format?: string) {
  if (format) {
    return moment(date).format(format)
  } else {
    return date
  }
}

export function eventEndDate(date: string, days: number, format?: string) {
  const d2 = moment(date).add(days - 1, "days").format("YYYY-MM-DD")
  if (format) {
    return moment(d2).format(format)
  } else {
    return d2
  }
}

/*
 "key": "kotlin",
 "title": "Kotlin Training",
 "subtitle": "Instructor-led 5-day hands-on workshop",
 "price": 2950,
 "days": 5,
 "leadTime": 30
 */
export interface Workshop {
  key: string;
  title: string;
  subtitle: string;
  price: number;
  days: number;
  leadTime: number;
}

export interface Signup {
  id?: string,
  workshopKey: string,  //react | kotlin | javascript | css
  date: string,
  name: string,
  companyName: string,
  phone: string,
  email: string,
  price: number,
  paid: number
}