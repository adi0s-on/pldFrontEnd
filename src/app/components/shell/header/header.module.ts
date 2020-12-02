import {NgModule} from '@angular/core';
import {HeaderComponent} from './header.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ HeaderComponent ],
})
export class HeaderModule {

}
