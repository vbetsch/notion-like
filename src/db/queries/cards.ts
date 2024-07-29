import dbConnect from '@/lib/dbConnect';
import Card from '@/db/models/Card';
import { CardCreateDto } from '@/db/types/dto/cards';
import { CardModelType } from '@/db/types/models/CardModelType';

const getCardsByColumnId = async (columnId: string): Promise<CardModelType[]> => {
	await dbConnect();
	return Card.find({ columnId }).sort({ name: 1 });
};
const createOneCard = async (columnId: string, card: CardCreateDto): Promise<CardModelType> => {
	await dbConnect();
	return Card.create({
		...card,
		columnId,
	});
};

export const CARDS = {
	getCardsByColumnId,
	createOneCard,
};
