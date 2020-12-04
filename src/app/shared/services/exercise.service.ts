import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Exercise} from '../models/exercise';
import {BehaviorSubject} from 'rxjs';
import {ExerciseDetails} from '../models/exercise-details';
import {ExerciseEquipment} from '../models/exercise-equipment';
import {ExerciseTraining} from '../models/exercise-training';
import {TrainingService} from './training.service';
import {TrainingUnit} from '../models/training-unit';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  exercises = new BehaviorSubject<Exercise[]>(null);
  exercises$ = this.exercises.asObservable();

  exerciseDetails = new BehaviorSubject<ExerciseDetails[]>(null);
  exerciseDetails$ = this.exerciseDetails.asObservable();

  exerciseEquipment = new BehaviorSubject<ExerciseEquipment[]>(null);
  exerciseEquipment$ = this.exerciseEquipment.asObservable();


  _exercises: Exercise[] = [];
  _exerciseDetails: ExerciseDetails[] = [];
  _exerciseEquipment: ExerciseEquipment[] = [];

  private readonly PATH = '/api/exercise';

  constructor(private _http: HttpClient) {
  }

  getAllExercises(): Promise<Exercise[]> {
    return new Promise((resolve, reject) => {
      this._http.get(this.PATH + '/getall/exercises').subscribe((res: Exercise[]) => {
        if (res) {
          this._exercises = res;
          this.exercises.next(res);
          resolve(res);
        }
      }, (err) => {
        reject(err);
      })
    })
  }

  getAllExerciseDetails(): Promise<ExerciseDetails[]> {
    return new Promise((resolve, reject) => {
      this._http.get(this.PATH + '/getall/exercisesdetails').subscribe((res: ExerciseDetails[]) => {
        if (res) {
          this._exerciseDetails = res;
          this.exerciseDetails.next(res);
          resolve(res);
        }
      }, (err) => {
        reject(err);
      })
    })
  }

  getAllExerciseEquipments(): Promise<ExerciseEquipment[]> {
    return new Promise((resolve, reject) => {
      this._http.get(this.PATH + '/getall/exerciseequipment').subscribe((res: ExerciseEquipment[]) => {
        if (res) {
          this._exerciseEquipment = res;
          this.exerciseEquipment.next(res);
          resolve(res);
        }
      }, (err) => {
        reject(err);
      })
    })
  }

  createNewExercise(data: any): Promise<Exercise> {
    return new Promise((resolve, reject) => {
      this._http.post(this.PATH + '/create/exercise', data).subscribe((res: Exercise) => {
        if (res) {
          resolve(res);
          this._exercises.push(res);
          this.exercises.next(this._exercises);
        }
      }, (err) => {
        reject(err);
      })
    })
  }

  createNewExerciseDetails(data: ExerciseDetails): Promise<ExerciseDetails> {
    return new Promise((resolve, reject) => {
      this._http.post(this.PATH + '/create/exerciseDetails', data).subscribe((res: ExerciseDetails) => {
        if (res) {
          resolve(res);
          this._exerciseDetails.push(res);
          this.exerciseDetails.next(this._exerciseDetails);
        }
      }, (err) => {
        reject(err);
      })
    })
  }

  createNewExerciseEquipment(data: ExerciseEquipment): Promise<ExerciseEquipment> {
    return new Promise((resolve, reject) => {
      this._http.post(this.PATH + '/create/exerciseequipment', data).subscribe((res: ExerciseEquipment) => {
        if (res) {
          resolve(res);
          this._exerciseEquipment.push(res);
          this.exerciseEquipment.next(this._exerciseEquipment);
        }
      }, (err) => {
        reject(err);
      })
    })
  }
}
