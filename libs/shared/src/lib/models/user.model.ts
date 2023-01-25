export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	birthday: Date;
    isAdmin: boolean;
    racer?: Racer;
}

export interface UserInfo {
    id: string;
	firstName: string;
	lastName: string;
	email: string;
	birthday: Date;
    isAdmin: boolean;
    racer?: Racer;
}

export interface Racer {
    team: string,
    rank: number,
    drone: Drone
}

export interface Drone {
    name: string,
    category: string,
    weight: number,
    brushless: boolean,
}
