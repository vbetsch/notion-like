import { BasicErrorResultType, CardsListResultType } from '@/api/types/ResultsTypes';
import { API } from '@/api/index';

const getCards = async (idColumn: string): Promise<CardsListResultType | BasicErrorResultType> => {
	return await API.getAPIDataFromUrl(
		`${API.CONSTANTS.URI.CARDS.ROOT}?idColumn=${idColumn}`,
		`Get all cards of column ${idColumn}`,
	);
};

// const createCards = async (
// 	idBoard: string,
// 	body: ColumnCreateDto,
// ): Promise<CreateColumnResultType | BasicErrorResultType> => {
// 	return await API.postAPIDataFromUrl(
// 		`${API.CONSTANTS.URI.COLUMNS.ROOT}?idBoard=${idBoard}`,
// 		`Create column in board ${idBoard}`,
// 		body,
// 	);
// };

export const CARDS = {
	getCards,
};
