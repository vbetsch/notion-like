import { BoardModelType } from '@/db/types/models/BoardModelType';
import { ColumnModelType } from '@/db/types/models/ColumnModelType';

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

export interface CreateColumnResultType {
	column_inserted: ColumnModelType;
	board_updated: BoardModelType;
}
