import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Subject} from 'rxjs';
import {User} from '../models/user.model';
import {Login} from '../models/login';
import {AuthResponse} from '../models/auth-response';
import {AuthService} from './auth/auth.service';
import {Register} from '../models/register';
import {UserDetails} from '../models/user-details';
import {DiaryService} from './diary.service';
import {DayService} from './day.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  readonly PATH = '/api/user';

  public user = new Subject<User>();
  public user$ = this.user.asObservable();

  private _users: User;

  constructor(private _http: HttpClient,
              private _authService: AuthService,
              private _diaryService: DiaryService) {
  }

  getUser(userId: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this._http.get<User>(this.PATH + `/get?id=${userId}`).subscribe((_response: User) => {
        this._users = _response;
        this.user.next(_response);
        this._diaryService.setDiaries(_response.Diaries);
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

  update(userData: {Id, Name, Surname, City}): Promise<User> {
    return new Promise((resolve, reject) => {
      this._http.put(this.PATH + '/update', userData).subscribe((res: User) => {
        if (res) {
          resolve(res);
          this._users = res;
          this.user.next(res);
        }
      }, (err) => {
        reject(err)
      })
    })
  }

  updateDetails(userDetails: {UserId, Height, Weight, Age}): Promise<UserDetails> {
    return new Promise((resolve, reject) => {
      this._http.put(this.PATH + '/updatedetails', userDetails).subscribe((res: UserDetails) => {
        if (res) {
          resolve(res);
          this._users.UserDetails = res;

          this.user.next(this._users);
        }
      }, (err) => {
        reject(err)
      })
    })
  }
}
