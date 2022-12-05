import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Drone } from '../drone/drone.schema';

export type UserDocument = Racer & Document;

@Schema()
export class Racer {
	@Prop({ required: true })
	team!: string;

	@Prop({ required: true })
	rank!: number;

	@Prop()
	drone: Drone | null;
}

export const RacerSchema = SchemaFactory.createForClass(Racer);
