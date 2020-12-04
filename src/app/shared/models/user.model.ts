import { Diaries } from './diaries.model';
import { UserDetails } from './user-details';

export class User {
    Id: string;
    Name: string;
    Surname: string;
    City: string;
    UserDetails: UserDetails;
    Diaries: Array<Diaries>;
}