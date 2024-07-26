import mongoose from 'mongoose';

export interface Boards extends mongoose.Document {
	name: string;
}

const BoardSchema = new mongoose.Schema<Boards>({
	name: {
		type: String,
		required: true,
	},
});

export default mongoose.models.Board || mongoose.model<Boards>('Board', BoardSchema);
