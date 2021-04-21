import {Component, OnInit, ViewChild} from '@angular/core';
import {SassHelperComponent} from './shared/providers/sass-helper/sass-helper.component';
import {SassHelperService} from './shared/services/sass-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PowerLiftersDiaryFrontend';

  @ViewChild(SassHelperComponent, { static: true })
  private sassHelper: SassHelperComponent;

  constructor(private sassHelperService: SassHelperService) {
    sassHelperService._colorsChanged.subscribe((status) => {
      if (status == true) this.fetchBrandingSettings()
    })
  }

  ngOnInit(): void {
    this.fetchBrandingSettings();

  }

  fetchBrandingSettings(): void {
    const brandingMap = this.sassHelperService.loadBrandingSettings();
    brandingMap?.forEach((value, key) => {
      if (!!value) {
        this.sassHelper.setProperty(key, value);
      }
    })
  }
}
