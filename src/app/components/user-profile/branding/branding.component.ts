import { Component, OnInit } from '@angular/core';
import {SassHelperService} from '../../../shared/services/sass-helper.service';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/models/user.model';

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss']
})
export class BrandingComponent implements OnInit {

  brandingMap: Map<string, string> = new Map<string, string>();

  constructor(private _sassHelperService: SassHelperService,
              private _userService: UserService) {
    this._userService.user$.subscribe((res: User) => {
      this._sassHelperService.saveBrandingSettings(res.UserDetails.BrandingSettings);
      this._sassHelperService.loadBrandingSettings(res.UserDetails.BrandingSettings);
    });

    this._sassHelperService._colorsChanged.subscribe(() => {
      this.brandingMap = this._sassHelperService.branding
    })
  }

  ngOnInit(): void {
    this.brandingMap = this._sassHelperService.branding;
  }

  setBrandingValue(item, value): void {
    this.brandingMap.set(item, value);
  }

  saveBrandingColors(): void {
    this._sassHelperService.saveBrandingSettings(this.brandingMap);
  }
}
