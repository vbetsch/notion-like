import { BoardModelType } from '@/db/types/models/BoardModelType';

export interface BoardResultType {
	board: BoardModelType | null;
}

export interface BoardsListResultType {
	boards: BoardModelType[];
}
