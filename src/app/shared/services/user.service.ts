import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../models/user.model';
import {Login} from '../models/login';
import {URLSearchParams} from 'url';
import {AuthResponse} from '../models/auth-response';
import {AuthService} from './auth/auth.service';
import {log} from 'util';
import {Register} from '../models/register';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  readonly PATH = '/api/user';

  public user = new Subject<User>();
  public user$ = this.user.asObservable();

  private _users: User;

  constructor(private _http: HttpClient,
              private _authService: AuthService) {
  }

  getUser(userId: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this._http.get<User>(this.PATH + `/get?id=${userId}`).subscribe((_response: User) => {
        _response.Diaries.map(diary => {
          diary.StartDate = (diary.StartDate.toString().replace(/\D/g, ''));
          diary.EndDate = (diary.EndDate.toString().replace(/\D/g, ''));
          diary.Days.map(day => {
            day.Date = (day.Date.toString().replace(/\D/g, ''));
          })
        });
        this.user.next(_response);
        if (_response) {
          resolve(_response);
        }
      }, (_error) => {
        reject(_error);
      });
    });
  }

  register(data: Register): void {
    this._http.post(this.PATH + '/create', data).subscribe((res) => {
      this.login({
        userName: data.userName,
        password: data.password,
        confirmPassword: data.confirmPassword
      });
      console.log(res)
    })
  }

  login(loginData: Login): void {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('username', loginData.userName)
      .set('password', loginData.password)
      .set('grant_type', 'password');
    this._http.post('/api/token', body, { headers: headers }).subscribe((res: AuthResponse) => {
      this._authService.logIn({ id: res.id, userName: loginData.userName, accessToken: res.access_token});
      this.getUserData();
    })
  }

  getUserData(): void {
    this._http.post('/api/user/authorization/test', {}).subscribe((res: any) => {
      this._authService.updateUserData(res.Id);
    })
  }
}
