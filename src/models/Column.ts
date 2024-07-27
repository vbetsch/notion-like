import mongoose from 'mongoose';

export interface ColumnType extends mongoose.Document {
	name: string;
	order: number;
	cards: mongoose.Types.ObjectId[];
}

const ColumnSchema = new mongoose.Schema<ColumnType>({
	name: {
		type: String,
		required: true,
	},
	order: {
		type: Number,
		required: true,
	},
	cards: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Card',
		},
	],
});

export default mongoose.models.Column || mongoose.model<ColumnType>('Column', ColumnSchema);
