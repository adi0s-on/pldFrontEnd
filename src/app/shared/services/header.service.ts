import {MenuLink} from '../models/menu-link';
import {Observable, of} from 'rxjs';

export class HeaderService {

  private readonly _headerOptions: MenuLink[] = [
    new MenuLink('home', '/home', 'fa-home'),
    new MenuLink('manage', '/manage', 'fa-cogs'),
    new MenuLink('profile', '/profile', 'fa-user'),
  ];

  get headerOptions(): Observable<MenuLink[]> {
    return of(this._headerOptions);
  }
}
