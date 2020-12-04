import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import { Diaries } from '../models/diaries.model';
import * as moment from 'moment';

@Injectable({
        providedIn: 'root'
    })
export class DiaryService{

    diary = new Subject<Diaries[]>();
    diary$ = this.diary.asObservable();

    public currentDiary = new BehaviorSubject<Diaries>(null);
    public currentDiary$ = this.currentDiary.asObservable();

    private _diary: Diaries[];

    constructor(private http: HttpClient){}

    PATH = 'api/diary';

    deleteDiary(id: string): Promise<any>{
        return new Promise((resolve, reject)=>{
            this.http.delete(this.PATH + `/delete?id=${id}`).subscribe((res: any)=>{
                this._diary = this._diary.filter(diary => diary.Id !== id);
                this.diary.next(this._diary);
                resolve(res);
            }, (err)=>{
                reject(err);
            });
        });
    }

    addDiary(diary: Diaries): Promise<Diaries>{
      diary.StartDate = moment(diary.StartDate).format();
        return new Promise((resolve, reject) =>{
            this.http.post(this.PATH + '/create', diary).subscribe((res: Diaries)=>{
                this._diary.push(res);
                this.diary.next(this._diary);
                if(res){
                    resolve(res);
                }
            }, (err) =>{
                reject(err);
            });
        });
    }

    editDiary(diary: Diaries): Promise<Diaries>{
        return new Promise ((resolve, reject)=>{
            this.http.put(this.PATH + 'update', diary).subscribe((res:Diaries)=>{
                // this._diary[this._diary.findIndex(m=>m.Id == diary.Id)] =diary;
                this.diary.next(this._diary);
                if(res){
                    resolve(res);

                }
            }, (err) => {
                reject(err);
            });
        });
    }

    setCurrentDiary(diary: Diaries): void {
      console.log(diary)
      this.currentDiary.next(diary);
    }
}
