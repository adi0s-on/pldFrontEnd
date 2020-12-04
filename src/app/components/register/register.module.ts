import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {RegisterComponent} from './register.component';
import {RegisterRoutingModule} from './register-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule {

}
