export interface Event {
  workshopKey: string;
  date: string;
  days: number;
  price: number;
}

export interface Signup {
  name: string,
  companyName: string,
  phone: string,
  email: string
}

export interface Path {
  page: string,
  id: string
}