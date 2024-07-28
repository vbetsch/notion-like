import { BoardType } from '@/db/types/BoardType';

export interface BoardResultType {
	board: BoardType | null;
}

export interface BoardsListResultType {
	boards: BoardType[];
}
