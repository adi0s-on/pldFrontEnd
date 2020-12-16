import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainpageuserComponent} from './mainpageuser.component';
import {SharedModule} from '../../shared/shared.module';
import {MainpageuserRoutingModule} from './mainpageuser-routing.module';
import {AuthGuard} from '../../shared/services/auth/auth.guard';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {RippleModule} from 'primeng/ripple';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MainpageuserRoutingModule,
    TableModule,
    TooltipModule,
    RippleModule,
    ButtonModule,
    InputTextModule,
    FormsModule
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
