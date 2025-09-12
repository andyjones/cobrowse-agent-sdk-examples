export function getSearchParam(key: string): null | string {
	return new URLSearchParams(window.location.search).get(key);
}

export function setSearchParam(key: string, value: string): string {
	const params = new URLSearchParams(document.location.search);
	if (params.get(key) === value) return value;
	params.set(key, value);

	const url = new URL(document.location.href);
	url.search = params.toString();

	window.history.replaceState(window.history.state, "", url);

	return value;
}
