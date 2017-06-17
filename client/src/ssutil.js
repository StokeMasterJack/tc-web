// import * as ga from 'ga'
import * as numeral from "numeral"

export function spaRedir(url: string) {
  window.history.pushState(null, "ignore", url)
  window.dispatchEvent(new PopStateEvent("popstate"))
  window.document.body.scrollTop = 0

  window.setTimeout(() => {
    window.ga('set', 'page', url)
    window.ga('send', 'pageview')
  }, 20)


}

export function capFirstLetter(s: string): string {
  const firstChar = s.substring(0, 1)
  const rest = s.substring(1)
  return firstChar.toUpperCase() + rest
}

/**
 * Contains at least 10 digits
 * 714 654 6550
 */
export function isValidPhoneNumber(ph: string): boolean {
  if (!ph) return false
  if (ph.length < 10) return false
  const stripped = ph.replace(/[\D]/g, "")
  return stripped.length >= 10
}


//$FlowFixMe
// const currencyFormatter = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD',maximumFractionDigits:0});

export function formatCurrency(num: number): string {
  return numeral(num).format('$0,0.00')
  // return currencyFormatter.format(num)
}
