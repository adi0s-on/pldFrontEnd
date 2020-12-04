import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

export interface Credentials {
  id: string;
  userName: string;
  accessToken: string;
}

const credentialsKey = 'CREDENTIALS';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _credentials: Credentials | null = null;

  public credentials = new BehaviorSubject<Credentials>(null);
  public credentials$: Observable<Credentials> = this.credentials.asObservable();

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
    this._router.navigate(['/login']).then();
  }

  logIn(credentials: Credentials) {
    this.setCredentials(credentials);
    this._router.navigate(['']).then();
  }

  updateUserData(id: string): void {
    const credentials = this.getCredentials;
      if (credentials) {
        credentials.id = id;
        this.setCredentials(credentials);
      }
  }

  setCredentials(credentials?: Credentials) {
    this._credentials = credentials || null;
    if (credentials) {
      localStorage.setItem(credentialsKey, JSON.stringify(credentials));
      this.credentials.next(credentials);
      this.isLoggedIn.next(true);
    } else {
      localStorage.removeItem(credentialsKey);
      this.credentials.next(null);
      this.isLoggedIn.next(false);
    }
  }

  get getCredentials(): Credentials | null {
    return this._credentials;
  }
}
