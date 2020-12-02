import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainpageuserComponent} from './mainpageuser.component';
import {SharedModule} from '../../shared/shared.module';
import {MainpageuserRoutingModule} from './mainpageuser-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MainpageuserRoutingModule
  ],
  declarations: [
    MainpageuserComponent,
  ]
})
export class MainpageuserModule {

}
