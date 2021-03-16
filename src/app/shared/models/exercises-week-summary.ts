import {ExerciseStatus} from './exercise-status';

export class ExercisesWeekSummary {
  constructor(StartDate?: string,
              EndDate?: string,
              WeekSummary?: ExerciseStatus[]) {
    this.StartDate = StartDate;
    this.EndDate = EndDate;
    this.WeekSummary = WeekSummary;
  }
  StartDate: string;
  EndDate: string;
  WeekSummary: ExerciseStatus[];
}
