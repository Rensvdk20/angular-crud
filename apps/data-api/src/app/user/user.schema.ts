import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop()
	id!: string;

	@Prop({ required: true })
	firstName!: string;

	@Prop({ required: true })
	lastName!: string;

	@Prop({ required: true })
	email!: string;

	@Prop({ required: true })
	birthday!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
