export interface CardDto {
	_id: string;
	name: string;
	description?: string;
	columnId: string;
}

export interface CardCreateDto {
	name: string;
	description?: string;
	columnId: string;
}
