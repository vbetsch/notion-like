import { QUERIES } from './queries';
import { FETCH } from '../services/fetch';
import { HttpMethods } from '../enums/HttpMethods';
import { CONSTANTS } from './constants';

const BASE_URL = '/api';

const _doAPIDataFromUrl = async (url: string, infoText: string, options: RequestInit): Promise<any> => {
	const result = await FETCH.fetchJsonByUrl(url, options);
	console.info(`(${url}) INFO: ${infoText}`);
	return result;
};

const getAPIDataFromUrl = async (url: string, infoText: string) => {
	const options: RequestInit = {
		method: HttpMethods.GET,
		headers: {
			accept: 'application/json',
		},
	};
	return await _doAPIDataFromUrl(BASE_URL + url, infoText, options);
};

const postAPIDataFromUrl = async (url: string, infoText: string, body?: any) => {
	const options: RequestInit = {
		method: HttpMethods.POST,
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
	};
	return await _doAPIDataFromUrl(BASE_URL + url, infoText, options);
};

export const API = {
	CONSTANTS,
	QUERIES,
	getAPIDataFromUrl,
	postAPIDataFromUrl,
};
