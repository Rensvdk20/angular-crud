import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = Drone & Document;

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
