import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TrainingUnit} from '../models/training-unit';
import {ExerciseTraining} from '../models/exercise-training';
import {DayService} from './day.service';
import {Day} from '../models/day.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private readonly PATH = '/api/training';

  constructor(private _http: HttpClient,
              private _dayService: DayService) {
  }

  addNewTrainingUnit(dayId: string): Promise<TrainingUnit> {
    return new Promise((resolve, reject) => {
      this._http.post(this.PATH + '/create/training', {DayId: dayId}).subscribe((res: TrainingUnit) => {
        if (res) {
          resolve(res)
        }
      }, (err) => {
        reject(err);
      })
    });
  }

  createNewExerciseTraining(dayId: string, data: any): Promise<ExerciseTraining> | void {
    console.log(data)
    this.addNewTrainingUnit(dayId).then((trainingRes: TrainingUnit) => {

      data.TrainingUnitId = trainingRes.Id;

      return new Promise((resolve, reject) => {
        this._http.post(this.PATH + '/create/exercise', data).subscribe((res: ExerciseTraining) => {
          if (res) {

            const sub = this._dayService.currentDay$.subscribe((_day: Day) => {
              if (_day) {
                trainingRes.ExerciseTrainings.push(res)
                _day.TrainingUnits.push(trainingRes);
                this._dayService.currentDay.next(_day);
              }
            });
            sub.unsubscribe();
            resolve(res);
          }
        }, (err) => {
          reject(err);
        })
      })
    });
  }
}
