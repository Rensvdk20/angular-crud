export interface UserCredentials {
	email: string;
	password: string;
}

export interface UserRegistration {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	birthday: Date;
}

export interface Token {
	token: string;
}
