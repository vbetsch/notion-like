import { MockBoardType } from './types/database';

const VALID_BOARD_ID: string = '60f9c2b0b9374c1b68f2b3e6';

const ALL_BOARDS: MockBoardType[] = [
	{
		_id: '60f9c2b0b9374c1b68f2b3e6',
		name: 'Test A',
		columns: [],
	},
	{
		_id: '60f9c2b0b9374c1b68f2b3e7',
		name: 'Test B',
		columns: [],
	},
	{
		_id: '60f9c2b0b9374c1b68f2b3e8',
		name: 'Test C',
		columns: [],
	},
];
const ONE_BOARD: MockBoardType = {
	_id: VALID_BOARD_ID,
	name: 'Test',
	columns: [],
};

export const BOARDS = { VALID_BOARD_ID, ALL_BOARDS, ONE_BOARD };
