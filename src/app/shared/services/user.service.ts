import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
        providedIn: 'root'
    })

export class UserService {
    user = new Subject<User>();
    user$ = this.user.asObservable();

    private _users: User;
    
    _url = 'https://powerliftersdiary.gear.host/user/get?id=4';


    constructor(private http: HttpClient){ }

    getUser(): void {
        this.http.get<User>(this._url).subscribe((res: User) =>{
        //  this._users = res;  głębsza logika 
         this.user.next(res);  //!!
        });
    }

    
}