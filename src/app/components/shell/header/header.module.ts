import {NgModule} from '@angular/core';
import {HeaderComponent} from './header.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ],
  exports: [ HeaderComponent ],
})
export class HeaderModule {

}
