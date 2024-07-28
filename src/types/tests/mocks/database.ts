export interface MockBoardType {
	_id: string;
	name: string;
	columns: MockColumnType[];
}

export interface MockColumnType {
	_id: string;
	name: string;
	order: number;
	cards: MockCardType[];
}

export interface MockCardType {
	_id: string;
	name: string;
	description: string;
}
