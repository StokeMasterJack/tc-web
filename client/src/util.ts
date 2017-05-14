export function spaRedir(to: string) {
  const url = "/" + to;
  window.history.pushState(null, null, url);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function capFirstLetter(s: string): string {
  const firstChar = s.substring(0, 1);
  const rest = s.substring(1);
  return firstChar.toUpperCase() + rest;
}

/**
 * Contains at least 10 digits
 * 714 654 6550
 */
export function isValidPhoneNumber(ph: string): boolean {
  if (!ph) return false;
  if (ph.length < 10) return false;
  const stripped = ph.replace(/[\D]/g, "");
  return stripped.length >= 10;
}


//$FlowFixMe
const currencyFormatter = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD',maximumFractionDigits:0});

export function formatCurrency(num: number): string {
    return currencyFormatter.format(num)
}
