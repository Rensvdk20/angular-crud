import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type DroneDocument = Drone & Document;

@Schema()
export class Drone {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	category: string;

	@Prop({ required: true })
	weight: number;

	@Prop({ required: true })
	brushless: boolean;
}

export const DroneSchema = SchemaFactory.createForClass(Drone);
