import { Db } from 'mongodb';
import client from '../../lib/mongodb';
import { CONSTANTS } from './constants';

const getMongoDatabase = async () => {
	try {
		console.log('(26/07/2024 01:03)  @reyks  [ index.ts:7 ]  client  ', client);
		// const mongodb_client = await client.connect();
		// return mongodb_client.db(process.env.MONGO_DATABASE);
	} catch (e) {
		throw e instanceof Error ? e : new Error("Can't connect to MongoDB database : " + e);
	}
};

export const DB = {
	CONSTANTS,
	getMongoDatabase,
};
