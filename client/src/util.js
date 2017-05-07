export function spaRedir(to) {
    const url = "/" + to;
    window.history.pushState(null, null, url);
    window.dispatchEvent(new window.PopStateEvent('popstate'));
}

export function capFirstLetter(s: string): string {
    var firstChar = s.substring(0, 1);
    var rest = s.substring(1);
    return firstChar.toUpperCase() + rest;
}