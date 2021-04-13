import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../../../shared/services/header.service';
import {MenuLink} from '../../../shared/models/menu-link';
import {Observable} from 'rxjs';
import {AuthService} from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean = false;

  constructor(private headerService: HeaderService,
              private _authService: AuthService) {
    _authService.isLoggedIn$.subscribe((res) => {
      this.loggedIn = res;
    })
  }

  ngOnInit(): void {
  }

  getHeaderOptions(): Observable<MenuLink[]> {
    return this.headerService.headerOptions;
  }

  logOut(): void {
    this._authService.logOut();
  }
}
