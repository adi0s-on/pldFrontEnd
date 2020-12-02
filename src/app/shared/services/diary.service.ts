import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Diaries } from '../models/diaries.model';

@Injectable({
        providedIn: 'root'
    })
export class DiaryService{

    diary = new Subject<Diaries>();
    diary$ = this.diary.asObservable();

    private _diary: Diaries;

    constructor(private http: HttpClient){}

    PATH = 'https://localhost:44328/';

    deleteDiary(id: string): Promise<any>{
        return new Promise((resolve, reject)=>{
            this.http.delete(this.PATH + `diary/delete?id=${id}`).subscribe((res: any)=>{
                this._diary = this._diary.filter(diary => diary.Id !== id);
                this.diary.next(this._diary);
                resolve(res);
            }, (err)=>{
                reject(err);
            });
        });
    }

    addDiary(diary: Diaries): Promise<Diaries>{
        return new Promise((resolve, reject) =>{
            this.http.post(this.PATH + 'diary/create',diary).subscribe((res: Diaries)=>{
                // this._diary.push(res);
                this.diary.next(this._diary);
                if(res){
                    resolve(res);
                }
            }, (err) =>{
                reject(err);
            });
        });
    }

    editDiart(diary: Diaries): Promise<Diaries>{
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
    
}