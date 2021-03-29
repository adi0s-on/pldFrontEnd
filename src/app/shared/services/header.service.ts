import {MenuLink} from '../models/menu-link';
import {Observable, of} from 'rxjs';

export class HeaderService {

  private readonly _headerOptions: MenuLink[] = [
    new MenuLink('home', '/home'),
    new MenuLink('manage', '/manage'),
    new MenuLink('profile', '/profile'),
  ];

  get headerOptions(): Observable<MenuLink[]> {
    return of(this._headerOptions);
  }
}
