import { NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

// const _INTERNAL = {}
// const CONSTANTS = {}

const print_error = (response: NextApiResponse, statusCode: StatusCodes, message: string) => {
	console.error(`ERROR: ${message}`);
	return response.status(statusCode).json({ error: message });
};
const print_stack = (response: NextApiResponse, statusCode: StatusCodes, error: unknown, message: string) => {
	console.error(`ERROR: ${message} -> ${error instanceof Error ? error.message : error}`);
	return response.status(statusCode).json({ error: message });
};

export const LOGGER = {
	// CONSTANTS,
	print_error,
	print_stack,
};
