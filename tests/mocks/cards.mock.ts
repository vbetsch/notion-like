import { MockCardType } from './types/database';
import { COLUMNS } from './columns.mock';

const VALID_CARD_ID: string = '66a683ccd3becd162ab8545d';

const ALL_CARDS: MockCardType[] = [
	{
		_id: '66a683ccd3becd162ab8545e',
		name: 'Card A',
		description: 'test A',
		columnId: COLUMNS.VALID_COLUMN_ID,
	},
	{
		_id: '66a683ccd3becd162ab8545f',
		name: 'Card B',
		description: 'test B',
		columnId: COLUMNS.VALID_COLUMN_ID,
	},
	{
		_id: '66a6eb74dadfc0df771eb29c',
		name: 'Card C',
		description: 'test C',
		columnId: COLUMNS.VALID_COLUMN_ID,
	},
];

const ONE_CARD: MockCardType = {
	_id: VALID_CARD_ID,
	name: 'Card 1',
	description: 'test',
	columnId: COLUMNS.VALID_COLUMN_ID,
};

export const CARDS = {
	VALID_CARD_ID,
	ALL_CARDS,
	ONE_CARD,
};
