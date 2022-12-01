export interface IMatch {
	id: number;
	name: string;
	date: Date;
	location: string;
	rank: number;
	prizeMoney: number;
	winnerId: number | null;
}
