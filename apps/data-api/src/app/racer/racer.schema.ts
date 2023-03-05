import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Drone } from '../drone/drone.schema';

export type RacerDocument = Racer & Document;

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
