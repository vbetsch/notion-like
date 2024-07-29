import { BoardModelType } from '@/db/types/models/BoardModelType';
import { ColumnModelType } from '@/db/types/models/ColumnModelType';
import { CardModelType } from '@/db/types/models/CardModelType';

export interface BasicErrorResultType {
	reason: string;
	message?: string;
}

export interface BoardResultType {
	board: BoardModelType | null;
}

export interface BoardsListResultType {
	boards: BoardModelType[];
}

export interface ColumnsListResultType {
	columns: ColumnModelType[];
}

export interface CardsListResultType {
	cards: CardModelType[];
}

export interface CreateColumnResultType {
	column_inserted: ColumnModelType;
	board_updated: BoardModelType;
}

export interface CreateCardResultType {
	card_inserted: CardModelType;
	column_updated: ColumnModelType;
}
