import { BasicErrorResultType, ColumnsListResultType, CreateColumnResultType } from '@/api/types/ResultsTypes';
import { API } from '@/api/index';
import { ColumnCreateDto } from '@/db/types/dto/columns';

const getColumns = async (idBoard: string): Promise<ColumnsListResultType | BasicErrorResultType> => {
	return await API.getAPIDataFromUrl(
		`${API.CONSTANTS.URI.COLUMNS.ROOT}?idBoard=${idBoard}`,
		`Get all columns of board ${idBoard}`,
	);
};

const createColumn = async (
	idBoard: string,
	body: ColumnCreateDto,
): Promise<CreateColumnResultType | BasicErrorResultType> => {
	return await API.postAPIDataFromUrl(
		`${API.CONSTANTS.URI.COLUMNS.ROOT}?idBoard=${idBoard}`,
		`Create column in board ${idBoard}`,
		body,
	);
};

export const COLUMNS = {
	getColumns,
	createColumn,
};
