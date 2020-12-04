import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageComponent} from './manage.component';
import {ManageRoutingModule} from './manage-routing.module';
import {TableModule} from 'primeng/table';
import {SharedModule} from '../../shared/shared.module';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';

@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    TableModule,
    SharedModule,
    ButtonModule,
    RippleModule
  ],
})
export class ManageModule {
}
