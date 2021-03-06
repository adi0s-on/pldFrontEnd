import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {SharedModule} from '../../shared/shared.module';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {UserProfileComponent} from './user-profile.component';
import {UserProfileRoutingModule} from './user-profile-routing.module';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ColorPickerModule} from 'primeng/colorpicker';
import { BrandingComponent } from './branding/branding.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    BrandingComponent
  ],
    imports: [
        CommonModule,
        UserProfileRoutingModule,
        TableModule,
        SharedModule,
        ButtonModule,
        RippleModule,
        FormsModule,
        InputTextModule,
        ColorPickerModule
    ],
})
export class UserProfileModule {
}
