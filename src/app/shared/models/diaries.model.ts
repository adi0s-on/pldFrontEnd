import { Day } from './day.model';

export class Diaries {
    filter(arg0: (diary: any) => boolean): Diaries {
        throw new Error('Method not implemented.');
    }
    BenchPressEnd: string;
    BenchPressStart: string;
    Conclusions: string;
    Days: Day[];
    DeadliftEnd: string;
    DeadliftStart: string;
    EndDate: string;
    Id: string;
    Progress: string;
    SquatEnd: string;
    SquatStart: string;
    StartDate: string;
    UserId: string;
}
