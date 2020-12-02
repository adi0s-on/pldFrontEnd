import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  readonly PATH = '/api/user';

  user = new Subject<User>();
  user$ = this.user.asObservable();

  private _users: User;

  constructor(private _http: HttpClient) {
  }

  getUser(userId: number): void {
    this._http.get<User>(this.PATH + `/get?id=${userId}`).subscribe((_response: User) => {
      _response.Diaries.map(diary => {
        diary.StartDate = +(diary.StartDate.toString().replace(/\D/g, ''));
        diary.EndDate = +(diary.EndDate.toString().replace(/\D/g, ''));
      });
      this.user.next(_response)
    });

    // this.http.get<User>(this._url).subscribe((res: User) => {
    //    this._users = res;  głębsza logika
      // this.user.next(res);  //!!
    // });
  }


}
