import { IUser } from './user.model';

export interface IMatch {
	id: number;
	name: string;
	date: Date;
	location: string;
	rank: number;
	prizeMoney: number;
	winner: IUser | null;
}
