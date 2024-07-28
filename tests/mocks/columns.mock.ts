import { MockColumnType } from './types/database';
import { BOARDS } from './boards.mock';

const VALID_COLUMN_ID: string = '66a683ccd3becd162ab8545c';

const ALL_COLUMNS: MockColumnType[] = [
	{
		_id: '66a683ccd3becd162ab85451',
		name: 'Test A',
		order: 1,
		cards: [],
		boardId: BOARDS.VALID_BOARD_ID,
	},
	{
		_id: '66a683ccd3becd162ab85452',
		name: 'Test B',
		order: 2,
		cards: [],
		boardId: BOARDS.VALID_BOARD_ID,
	},
	{
		_id: '66a683ccd3becd162ab85453',
		name: 'Test C',
		order: 3,
		cards: [],
		boardId: BOARDS.VALID_BOARD_ID,
	},
];

const ONE_COLUMN: MockColumnType = {
	_id: VALID_COLUMN_ID,
	name: 'Test 1',
	order: 1,
	cards: [],
	boardId: BOARDS.VALID_BOARD_ID,
};

export const COLUMNS = { VALID_COLUMN_ID, ALL_COLUMNS, ONE_COLUMN };
