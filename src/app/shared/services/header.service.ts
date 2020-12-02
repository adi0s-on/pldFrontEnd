import {MenuLink} from '../models/menu-link';
import {Observable, of} from 'rxjs';

export class HeaderService {

  private readonly _headerOptions: MenuLink[] = [
    new MenuLink('home', '/home'),
    new MenuLink('home2', '/home'),
    new MenuLink('home3', ''),
    new MenuLink('Login', '/login'),
    new MenuLink('Sign up', '/signup')
  ];

  get headerOptions(): Observable<MenuLink[]> {
    return of(this._headerOptions);
  }
}