import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SassHelperService {

  private BRANDING_KEY = 'BRANDING';

  public colorsChanged = new Subject<boolean>();
  public _colorsChanged = this.colorsChanged.asObservable();
  public branding;

  constructor() {
  }

  saveBrandingSettings(brandingValues: Map<string, string>): void {
    let json = {};
    brandingValues.forEach((value, key) => {
      json[key] = value;
    });
    localStorage.setItem(this.BRANDING_KEY, JSON.stringify(json));
    this.colorsChanged.next(true);
  }

  loadBrandingSettings(): any {
    let json = JSON.parse(localStorage.getItem(this.BRANDING_KEY));
    let map = new Map<string, string>();
    for(let v in json) {
      map.set(v, json[v])
    }
    this.branding = map;
    return map.size > 0 ?
      map :
      null;
  }
}
