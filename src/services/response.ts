import { NextApiResponse } from 'next';
import { getReasonPhrase, ReasonPhrases, StatusCodes } from 'http-status-codes';
import { LOGGER } from '@/services/logger';
import { BasicErrorResultType } from '@/api/types/ErrorsResultsTypes';

const compute_warning = (response: NextApiResponse, status: StatusCodes, message: string, body?: any) => {
	LOGGER.print_warning(message);
	return response.status(status).json(body);
};
const compute_error = (response: NextApiResponse, status: StatusCodes, message?: string) => {
	const _reason = getReasonPhrase(status);
	LOGGER.print_error(_reason);
	return response.status(status).json({ reason: _reason, message });
};
const compute_stack = (response: NextApiResponse, error: unknown) => {
	const _err: string | unknown = error instanceof Error ? error.message : error;
	const _result: BasicErrorResultType = {
		reason: ReasonPhrases.INTERNAL_SERVER_ERROR,
		message: error instanceof Error ? error.message : undefined,
	};
	LOGGER.print_stack(_err, ReasonPhrases.INTERNAL_SERVER_ERROR);
	return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(_result);
};

export const RESPONSE = {
	compute_warning,
	compute_error,
	compute_stack,
};
