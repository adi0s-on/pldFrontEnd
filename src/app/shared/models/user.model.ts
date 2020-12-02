import { Diaries } from './diaries.model';

export class User {
    Id: string;
    Name: string;
    Surname: string;
    City: string;
    UserDetails: Object;
    Diaries: Array<Diaries>;
}