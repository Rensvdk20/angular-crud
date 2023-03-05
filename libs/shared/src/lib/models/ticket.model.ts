import { IMatch } from "./match.model";
import { IUser } from "./user.model";

export interface ITicket {
    id: string,
    price: number,
    type: string,
    seatNumber: number,
    match: IMatch,
    reservedBy: IUser | null
}