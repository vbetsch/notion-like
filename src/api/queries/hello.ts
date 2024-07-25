import { HelloType } from '../../types/api/HelloType';
import { API } from '../index';
import { DB } from '../../db';

const getHelloWorld = async (): Promise<HelloType> => {
	return await API.getAPIDataFromUrl(API.CONSTANTS.URI.HELLO_WORLD, 'Get hello world');
};

const test = async () => {
	const db = await DB.getMongoDatabase();
	return db.collection(DB.CONSTANTS.COLLECTIONS.TEST);
};

export const HELLO = {
	getHelloWorld,
	test,
};
