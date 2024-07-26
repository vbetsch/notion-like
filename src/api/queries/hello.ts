import { HelloType } from '@/types/api/HelloType';
import { API } from '../index';

const getHelloWorld = async (): Promise<HelloType> => {
	return await API.getAPIDataFromUrl(API.CONSTANTS.URI.HELLO_WORLD, 'Get hello world');
};

export const HELLO = {
	getHelloWorld,
};
