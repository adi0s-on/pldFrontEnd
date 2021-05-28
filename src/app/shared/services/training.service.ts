import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TrainingUnit} from '../models/training-unit';
import {ExerciseTraining} from '../models/exercise-training';
import {DayService} from './day.service';
import {UserService} from './user.service';
import {AuthService} from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private readonly PATH = '/api/training';

  constructor(private _http: HttpClient,
              private _dayService: DayService,
              private _userService: UserService,
              private _authService: AuthService) {
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

  addExerciseToTrainingUnit(data: any): Promise<ExerciseTraining> {
    console.log(data)
    return new Promise((resolve, reject) => {
      this._http.post(this.PATH + '/create/exercise', data).subscribe((res) => {
        console.log(res);
        if (res) {
          const currentDay = this._dayService._currentDay;
          if (currentDay) {
            currentDay.TrainingUnits[currentDay.TrainingUnits.map(tu => tu.Id).indexOf(data.TrainingUnitId)].ExerciseTrainings.push(res);
            this._dayService.currentDay.next(currentDay);
            this._dayService._currentDay = currentDay;
          }
          resolve(res);
        }
      }, (err) => {
        reject(err);
      })
    })
  }

  createNewExerciseTraining(dayId: string, data: any): Promise<ExerciseTraining> | void {
    this.addNewTrainingUnit(dayId).then((trainingRes: TrainingUnit) => {

      data.TrainingUnitId = trainingRes.Id;
      trainingRes.ExerciseTrainings = [];

      return new Promise((resolve, reject) => {
        this._http.post(this.PATH + '/create/exercise', data).subscribe((res: ExerciseTraining) => {
          if (res) {

            const currentDay = this._dayService._currentDay;
            if (currentDay) {
              trainingRes.ExerciseTrainings.push(res);
              currentDay.TrainingUnits.push(trainingRes);
              this._dayService.currentDay.next(currentDay);
              this._dayService._currentDay = currentDay;
            }
            resolve(res);
          }
        }, (err) => {
          reject(err);
        })
      })
    });
  }

  createExerciseTrainingsForUnit(data: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.post(this.PATH + `/create/exerciselist`, data).subscribe((res: ExerciseTraining[]) => {
        resolve(res)
        this._userService.getUser(this._authService.getCredentials.id).then();
      }, (err) => {
        reject(err);
      })
    })
  }
}
