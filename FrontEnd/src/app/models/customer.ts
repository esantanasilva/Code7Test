import { Debt } from "./debit";

export class Customer{
    id: string;
    createdAt: Date;
    upddatedAt: Date;
    externalId: number;
    name: string;
    username: string;
    email:string
    phone:string
    debts: Debt[];
}