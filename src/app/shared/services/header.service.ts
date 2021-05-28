import {MenuLink} from '../models/menu-link';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

export class HeaderService {

  public menuOpened = new Subject();
  public menuOpened$ = this.menuOpened.asObservable();

  private readonly _headerOptions: MenuLink[] = [
    new MenuLink('home', '/home', 'fa-home'),
    new MenuLink('manage', '/manage', 'fa-cogs'),
    new MenuLink('profile', '/profile', 'fa-user'),
  ];

  get headerOptions(): Observable<MenuLink[]> {
    return of(this._headerOptions);
  }

  toggleMenu(): void {
    this.menuOpened.next();
  }
}
