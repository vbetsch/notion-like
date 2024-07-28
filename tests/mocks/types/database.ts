import { CardDto } from '@/db/types/dto/cards';
import { ColumnDto } from '@/db/types/dto/columns';
import { BoardDto } from '@/db/types/dto/boards';

export interface MockBoardType extends BoardDto {
	columns: MockColumnType[];
}

export interface MockColumnType extends ColumnDto {
	cards: MockCardType[];
}

export interface MockCardType extends CardDto {}
