import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth/auth.service';
import * as moment from 'moment';
import {UserService} from './user.service';
import {DiaryService} from './diary.service';
import {Day} from '../models/day.model';
import {BehaviorSubject} from 'rxjs';
import {Dream} from '../models/dream';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  public currentDay = new BehaviorSubject<Day>(null);
  public currentDay$ = this.currentDay.asObservable();

  readonly PATH = '/api/day';

  constructor(private _http: HttpClient,
              private _authService: AuthService,
              private _userService: UserService,
              private _diaryService: DiaryService) {
  }

  createDay(data: {Date, DiaryId}): Promise<Day> {
    return new Promise((resolve, reject) => {
      data.Date = moment(data.Date).format();
      this._http.post(this.PATH + '/create', data).subscribe((res: Day) => {
        this._userService.getUser(this._authService._credentials.id).then((user) => {
          this._diaryService.setCurrentDiary(user.Diaries.filter(diary => diary.Id == data.DiaryId)[0]);
          resolve(res)
        });
      }, (err) => {
        reject(err)
      })
    })
  }

  addDream(data: any): Promise<Dream> {
    return new Promise((resolve, reject) => {
      this._http.post(this.PATH + '/adddream', data).subscribe((res: Dream) => {
        if (res) {
          resolve(res)
        }
      }, (err) => {
        reject(err)
      })
    });
  }
}
