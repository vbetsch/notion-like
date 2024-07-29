import { MockBoardType, MockCardType, MockColumnType } from './database';

export interface MockBoardsListResultType {
	boards: MockBoardType[];
}

export interface MockBoardResultType {
	board: MockBoardType | null;
}

export interface MockColumnsListResultType {
	columns: MockColumnType[];
}

export interface MockCreateColumnResultType {
	column_inserted: MockColumnType;
	board_updated: MockBoardType;
}

export interface MockCardsListResultType {
	cards: MockCardType[];
}

export interface MockCreateCardResultType {
	card_inserted: MockCardType;
	column_updated: MockColumnType;
}
