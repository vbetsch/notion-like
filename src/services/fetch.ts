// const _INTERNAL = {}
// const CONSTANTS = {}

const fetchJsonByUrl = async (url: string, options: RequestInit): Promise<unknown> => {
	const response: Response = await fetch(url, options);
	return await response.json();
};

export const FETCH = {
	// CONSTANTS,
	fetchJsonByUrl,
};
