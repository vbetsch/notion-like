import { CardDto } from '@/db/types/dto/cards';

export interface ColumnDto {
	_id: string;
	name: string;
	order: number;
	cards: CardDto[];
	boardId: string;
}

export interface ColumnCreateDto {
	name: string;
	order: number;
	boardId: string;
	cards: [];
}
