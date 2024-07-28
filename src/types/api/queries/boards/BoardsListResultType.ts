import { BoardType } from '@/types/db/BoardType';

export interface BoardsListResultType {
	boards: BoardType[];
}
export interface BoardResultType {
	board: BoardType;
}
