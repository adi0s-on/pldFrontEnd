import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainpageuserComponent} from './mainpageuser.component';
import {SharedModule} from '../../shared/shared.module';
import {MainpageuserRoutingModule} from './mainpageuser-routing.module';
import {AuthGuard} from '../../shared/services/auth/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MainpageuserRoutingModule
  ],
  declarations: [
    MainpageuserComponent,
  ],
  providers: [
    AuthGuard
  ]
})
export class MainpageuserModule {

}
