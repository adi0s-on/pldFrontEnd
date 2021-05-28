import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
@Injectable({
  providedIn: 'root'
})
export class SassHelperService {

  readonly PATH = '/api/user';

  private BRANDING_KEY = 'BRANDING';

  public colorsChanged = new Subject<boolean>();
  public _colorsChanged = this.colorsChanged.asObservable();
  public branding;

  constructor(private _http: HttpClient,
              private _userService: UserService) {
  }

  saveBrandingSettings(brandingValues: (Map<string, string> | string)): void {
    if (typeof brandingValues == 'string') {
      localStorage.setItem(this.BRANDING_KEY, brandingValues);
      this.colorsChanged.next(true);
      this.saveBranding(brandingValues);
    } else {
      let json = {};
      brandingValues.forEach((value, key) => {
        json[key] = value;
      });
      localStorage.setItem(this.BRANDING_KEY, JSON.stringify(json));
      this.colorsChanged.next(true);
      this.saveBranding(JSON.stringify(json));
    }
  }

  loadBrandingSettings(branding?: string): any {
    let json = branding ? JSON.parse(branding) : JSON.parse(localStorage.getItem(this.BRANDING_KEY));
    let map = new Map<string, string>();
    for(let v in json) {
      map.set(v, json[v])
    }
    this.branding = map;
    return map.size > 0 ?
      map :
      null;
  }

  saveBranding(branding: string): void {
    let userId: string;
    this._userService.user$.subscribe(res => {
      this._http.post(this.PATH + '/savebranding', { Id: res.Id, BrandingSettings: branding}).subscribe();
    })
  }
}
