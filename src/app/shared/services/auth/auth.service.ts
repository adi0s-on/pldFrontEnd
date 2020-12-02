import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

export interface Credentials {
  email: string;
  accessToken: string;
}

const credentialsKey = 'CREDENTIALS';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _credentials: Credentials | null = null;

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();
  public isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(
    map((isLoggedIn) => !isLoggedIn)
  );

  constructor(private _http: HttpClient,
              private _router: Router) {
    const savedCredentials = localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
      this.isLoggedIn.next(true);
    }
  }

  isAuthenticated(): boolean {
    return !!this._credentials;
  }

  logOut() {
    this.setCredentials(null);
    this._router.navigate(['.']).then();
  }

  setCredentials(credentials?: Credentials) {
    this._credentials = credentials || null;
    if (credentials) {
      localStorage.setItem(credentialsKey, JSON.stringify(credentials));
      this.isLoggedIn.next(true);
    } else {
      localStorage.removeItem(credentialsKey);
      this.isLoggedIn.next(false);
    }
  }

  get getCredentials(): Credentials | null {
    return this._credentials;
  }
}
