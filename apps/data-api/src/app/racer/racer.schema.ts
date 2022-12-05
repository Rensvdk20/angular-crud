import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = Racer & Document;

@Schema()
export class Racer {
	@Prop({ default: uuidv4 })
	id!: string;

	@Prop({ required: true })
	team!: string;

	@Prop({ required: true })
	rank!: number;

	// @Prop({ required: true })
	// drone: Drone;
}

export const UserSchema = SchemaFactory.createForClass(Racer);
