import { IUser } from './user.model';

export interface IMatch {
	id: string;
	name: string;
	date: Date;
	location: string;
	rank: number;
	prizeMoney: number;
    racers: IUser[];
	winner: IUser | null;
}
