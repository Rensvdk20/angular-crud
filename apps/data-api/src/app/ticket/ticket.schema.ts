import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Match } from '../match/match.schema';
import { User } from '../user/user.schema';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
	@Prop({ default: uuidv4 })
	id!: string;

	@Prop({ required: true })
	price!: number;

	@Prop({ required: true })
	type!: string;

	@Prop({ required: true })
	seatNumber!: number;

	@Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
	user!: User;

	@Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Match' })
	match!: Match;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
