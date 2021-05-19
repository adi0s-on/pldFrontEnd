import { Component, OnInit } from '@angular/core';
import {SassHelperService} from '../../../shared/services/sass-helper.service';

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss']
})
export class BrandingComponent implements OnInit {

  brandingMap: Map<string, string> = new Map<string, string>();

  constructor(private _sassHelperService: SassHelperService) { }

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
