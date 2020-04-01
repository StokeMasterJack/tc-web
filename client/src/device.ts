import MobileDetect from "mobile-detect";

export function isNotPhone(): boolean {
  return !isPhone();
}

export function isPhone(): boolean {
  const md = new MobileDetect(window.navigator.userAgent);
  const phone = md.phone();
  return !!phone;
}