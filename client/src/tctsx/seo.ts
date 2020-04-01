import * as ss from '../util/ssutil';

export function setSeoMetaDesc(text: string) {
  const meta = window.document.querySelector('meta[name=\'description\']')!!;
  meta.setAttribute('content', text);
}

export function setSeoTitle(text: string) {
  window.document.title = text;
}

export function setSeo(title: string, metaDesc: string) {
  setSeoTitle(title);
  setSeoMetaDesc(metaDesc);
}

export function computeSeoTitle(workshopKey: string): string {
  return ss.capFirstLetter(workshopKey) + ' Training';
}

export function computeSeoMetaDesc(workshopKey: string): string {
  return `5-day hands-on, instructor-led ${workshopKey} training. Public and private workshops.`;
}

export function resetTitleAndMeta(workshopKey: string) {
  const seoTitle = computeSeoTitle(workshopKey);
  const seoMetaDesc = computeSeoMetaDesc(workshopKey);
  setSeo(seoTitle, seoMetaDesc);
}