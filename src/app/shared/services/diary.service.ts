import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {Diaries} from '../models/diaries.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  public diary = new Subject<Diaries[]>();
  public diary$ = this.diary.asObservable();

  public currentDiary = new BehaviorSubject<Diaries>(null);
  public currentDiary$ = this.currentDiary.asObservable();

  private _diary: Diaries[];
  public _currentDiary: Diaries;

  constructor(private http: HttpClient) {
  }

  PATH = 'api/diary';

  setDiaries(diaries: Diaries[]): void {
    this._diary = diaries;
    this.diary.next(this._diary);
  }

  deleteDiary(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(this.PATH + `/delete?id=${id}`).subscribe((res: any) => {
        this._diary = this._diary.filter(diary => diary.Id !== id);
        this.diary.next(this._diary);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  addDiary(diary: Diaries): Promise<Diaries> {
    diary.StartDate = moment(diary.StartDate).format();
    return new Promise((resolve, reject) => {
      this.http.post(this.PATH + '/create', diary).subscribe((res: Diaries) => {
        res.StartDate = (res.StartDate.toString().replace(/\D/g, ''));
        res.EndDate = (res.EndDate.toString().replace(/\D/g, ''));

        this._diary.push(res);
        this.diary.next(this._diary);
        if (res) {
          resolve(res);
        }
      }, (err) => {
        reject(err);
      });
    });
  }

  editDiary(diary: Diaries): Promise<Diaries> {
    if (diary.StartDate) {
      diary.StartDate = moment(diary.StartDate).format();
    }
    if (diary.EndDate) {
      diary.EndDate = moment(diary.EndDate).format();
    }
    return new Promise((resolve, reject) => {
      this.http.put(this.PATH + '/update', diary).subscribe((res: Diaries) => {
        res.StartDate = (res.StartDate.toString().replace(/\D/g, ''));
        res.EndDate = (res.EndDate.toString().replace(/\D/g, ''));

        this._diary[this._diary.findIndex(d => d.Id === diary.Id)] = res;
        this.diary.next(this._diary);
        if (res) {
          resolve(res);
        }
      }, (err) => {
        reject(err);
      });
    });
  }

  setCurrentDiary(diary: Diaries): void {
    this.currentDiary.next(diary);
    this._currentDiary = diary;
  }
}
