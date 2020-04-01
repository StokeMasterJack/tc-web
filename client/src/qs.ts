/**
 * @file Utils for operating on url query string (window.location.search)
 */

export function get(search: string | null, name: string): (string | null) {
  if (!search) return null;
  const qs = search.trim().startsWith("?") ? search.trim().substring(1) : search.trim();
  let params = new URLSearchParams(qs);
  return params.get(name);
}

export function has(search: string | null, name: string): boolean {
  if (!search) return false;
  const qs = search.trim().startsWith("?") ? search.trim().substring(1) : search.trim();
  let params = new URLSearchParams(qs);
  return params.has(name);
}

