//@flow

/**
 * @file Utils for operating on url paths (window.location.pathname)
 */

function checkNotFalsey(value?: string, msg?: string) {
  if (!value) throw Error(msg ? msg : "AssertionError")
}

function check(assertion: boolean, msg?: string) {
  if (!assertion) throw Error(msg ? msg : "AssertionError")
}

export function isRoot(path: string) {
  checkNotFalsey(path)
  return segmentCount(path) === 0
}

export function toArray(path: string): Array<string> {
  checkNotFalsey(path)
  check(typeof path === 'string', `path must be a string [${path}]`)
  const retVal = []
  const a = path.split("/")
  for (let segment of a) {
    if (segment.trim()) retVal.push(segment.trim())
  }
  return retVal
}

export function segmentCount(path: string): number {
  return toArray(path).length
}

export function segmentAt(path: string, i: number): ?string {
  checkNotFalsey(path)
  check(i !== undefined && i !== null)
  check(i >= 0 && i < 20)
  const a = toArray(path)
  if (a.length < (i + 1)) return null
  return a[i]
}

export function firstSegment(path): ?string {
  return segmentAt(path, 0)
}

export function lastSegment(path): ?string {
  checkNotFalsey(path)
  const a = toArray(path)
  if (a.length === 0) return null
  return a[a.length - 1]
}