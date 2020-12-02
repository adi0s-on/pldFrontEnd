import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../../../shared/services/header.service';
import {MenuLink} from '../../../shared/models/menu-link';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
  }

  getHeaderOptions(): Observable<MenuLink[]> {
    return this.headerService.headerOptions;
  }
}
