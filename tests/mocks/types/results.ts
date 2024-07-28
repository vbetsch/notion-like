import { MockBoardType } from './database';

export interface MockBoardsListResultType {
	boards: MockBoardType[];
}

export interface MockBoardResultType {
	board: MockBoardType | null;
}
