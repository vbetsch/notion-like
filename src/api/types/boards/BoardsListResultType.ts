import { BoardType } from '@/db/types/BoardType';

export interface BoardsListResultType {
	boards: BoardType[];
}

export interface BoardResultType {
	board: BoardType;
}
