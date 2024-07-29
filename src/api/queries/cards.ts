import { BasicErrorResultType, CardsListResultType, CreateCardResultType } from '@/api/types/ResultsTypes';
import { API } from '@/api/index';
import { CardCreateDto } from '@/db/types/dto/cards';

const getCards = async (idColumn: string): Promise<CardsListResultType | BasicErrorResultType> => {
	return await API.getAPIDataFromUrl(
		`${API.CONSTANTS.URI.CARDS.ROOT}?idColumn=${idColumn}`,
		`Get all cards of column ${idColumn}`,
	);
};

const createCards = async (
	idColumn: string,
	body: CardCreateDto,
): Promise<CreateCardResultType | BasicErrorResultType> => {
	return await API.postAPIDataFromUrl(
		`${API.CONSTANTS.URI.CARDS.ROOT}?idColumn=${idColumn}`,
		`Create card in column ${idColumn}`,
		body,
	);
};

export const CARDS = {
	getCards,
	createCards,
};
