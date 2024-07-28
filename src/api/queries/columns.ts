import { BasicErrorResultType, CreateColumnResultType } from '@/api/types/ResultsTypes';
import { API } from '@/api/index';
import { ColumnCreateDto } from '@/db/types/dto/columns';

const createColumn = async (
	idBoard: string,
	body: ColumnCreateDto,
): Promise<CreateColumnResultType | BasicErrorResultType> => {
	return await API.postAPIDataFromUrl(
		`${API.CONSTANTS.URI.COLUMNS.CREATE}?idBoard=${idBoard}`,
		'Create column',
		body,
	);
};

export const COLUMNS = {
	createColumn,
};
