import { MockBoardType, MockColumnType } from './database';

export interface MockBoardsListResultType {
	boards: MockBoardType[];
}

export interface MockBoardResultType {
	board: MockBoardType | null;
}

export interface MockCreateColumnResultType {
	column_inserted: MockColumnType;
	board_updated: MockBoardType;
}
