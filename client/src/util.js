export function spaRedir(to) {
    const url = "/" + to;
    window.history.pushState(null, null, url);
    window.dispatchEvent(new window.PopStateEvent('popstate'));
}