import { BoardType } from '@/db/types/BoardType';

export interface BoardResultType {
	board: BoardType;
}

export interface BoardsListResultType {
	boards: BoardType[];
}
