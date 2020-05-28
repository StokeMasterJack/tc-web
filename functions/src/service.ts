import workshops from './data/workshops.json';
import testimonials from './data/testimonials.json';
import flutterOutline from './data/outlines/flutter-outline.json';
import kotlinOutline from './data/outlines/kotlin-outline.json';
import reactOutline from './data/outlines/react-outline.json';
import ooOutline from './data/outlines/oo-outline.json';
import patternsOutline from './data/outlines/patterns-outline.json';
import {CEvent, CWorkshop, DEvent, DWorkshop, ONode, Outline, Signup, Testimonial} from './types';
import firebase from 'firebase/app';

import events from './data/events.json';
import {LocalDate} from './util/date-time';

type Database = firebase.database.Database;
type DataSnapshot = firebase.database.DataSnapshot;
type Reference = firebase.database.Reference;

const outlines = {
  flutter: flutterOutline,
  kotlin: kotlinOutline,
  react: reactOutline,
  oo: ooOutline,
  patterns: patternsOutline
};

export function loadEventsSync({workshopKey, date, isComplete}: { workshopKey?: string, date?: LocalDate, isComplete?: boolean } = {}): ReadonlyArray<CEvent> {
  const dEvents: DEvent[] = events;
  const cEvents: ReadonlyArray<CEvent> = dEvents.map(d => new CEvent(d));

  const u = undefined;

  function where(c: CEvent) {
    return (workshopKey === u || c.workshopKey === workshopKey) &&
      (date === u || c.date === date) &&
      (isComplete === u || c.isComplete === isComplete);
  }

  function orderBy(a: CEvent, b: CEvent) {
    return a.date.localeCompare(b.date);
  }

  return cEvents.filter(where).sort(orderBy);

}

export function loadEventSync(workshopKey: string, date: LocalDate): CEvent {
  const cEvents = loadEventsSync({workshopKey, date});
  const key = `${workshopKey}-${date}`;
  if (cEvents.length === 0) {
    throw Error(`No events matching key[${key}]`);
  } else if (cEvents.length === 1) {
    return cEvents[0];
  } else {
    throw Error(`IllegalState: multiple events with the same key[${key}]`);
  }
}

export function loadWorkshopsSync({homePage}: { homePage?: boolean } = {}): ReadonlyArray<CWorkshop> {
  const dWorkshops: DWorkshop[] = workshops;
  const cWorkshops: ReadonlyArray<CWorkshop> = dWorkshops.map(d => new CWorkshop(d));

  function where(c: CWorkshop) {
    return homePage === undefined || c.homePage === homePage;
  }

  return cWorkshops.filter(where);

}

export function loadWorkshopSync(workshopKey: string): CWorkshop {
  const predicate = (c: CWorkshop): boolean => c.key === workshopKey;
  const w = loadWorkshopsSync().find(predicate);
  if (!w) throw Error(`Bad workshopKey[${workshopKey}]`);
  return w;
}

export function loadOutlineSync(workshopKey: string): Outline {
  if (!workshopKey) throw Error('workshopKey is a required parameter');
  const nodes: ONode[] = (outlines as any)[workshopKey];
  if (!nodes) throw new Error('Bad workshopKey[' + workshopKey + ']');
  const workshop: CWorkshop = loadWorkshopSync(workshopKey);
  return {
    title: workshop.title,
    subtitle: workshop.subtitle,
    nodes
  };
}

export interface SignupMap {
  [key: string]: Signup;
}

function signupMapToArray(m: SignupMap): ReadonlyArray<Signup> {
  const keys: string[] = Object.keys(m);

  function keyToSignup(id: string): Signup {
    return {...m[id], id};
  }

  return keys.map(keyToSignup);
}

export async function loadSignupsAsync(filter?: { workshopKey: string, date: LocalDate }): Promise<ReadonlyArray<Signup>> {
  const database: Database = firebase.database();
  const signupsRef: Reference = database.ref('signups');
  const snapshot: DataSnapshot = await signupsRef.once('value');
  const m: SignupMap = snapshot.val();
  const a: ReadonlyArray<Signup> = signupMapToArray(m);
  if (!filter) {
    return a;
  }

  const workshopKey = filter.workshopKey;
  const date = filter.date;

  function predicate(s: Signup): boolean {
    return s.workshopKey === workshopKey && s.date === date;
  }

  return a.filter(predicate);
}

export function loadTestimonialsSync({homePage}: { homePage?: boolean } = {}): ReadonlyArray<Testimonial> {
  return testimonials;
}