import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/user.schema';

export type MatchDocument = Match & Document;

@Schema()
export class Match {
	@Prop({ default: uuidv4 })
	id!: string;

	@Prop({ required: true })
	name!: string;

	@Prop({ required: true })
	date!: Date;

	@Prop({ required: true })
	location!: string;

	@Prop({ required: true })
	rank!: number;

	@Prop({ required: true })
	prizeMoney!: number;

	@Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
	winnerId!: User;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
