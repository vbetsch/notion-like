import { MockColumnType } from './types/database';
import { BOARDS } from './boards.mock';

const VALID_COLUMN_ID: string = '66a683ccd3becd162ab8545c';

const ONE_COLUMN: MockColumnType = {
	_id: VALID_COLUMN_ID,
	name: 'Test 1',
	order: 1,
	cards: [],
	boardId: BOARDS.VALID_BOARD_ID,
};

export const COLUMNS = { VALID_COLUMN_ID, ONE_COLUMN };
