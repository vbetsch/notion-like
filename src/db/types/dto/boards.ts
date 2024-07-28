import { ColumnDto } from '@/db/types/dto/columns';

export interface BoardDto {
	_id: string;
	name: string;
	columns: ColumnDto[];
}
