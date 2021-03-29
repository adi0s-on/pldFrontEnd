import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ShellModule} from './components/shell/shell.module';
import {LoginModule} from './components/login/login.module';
import {MainpageuserModule} from './components/mainpageuser/mainpageuser.module';
import {NotfoundRoutingModule} from './components/notfound/notfound-routing.module';
import {TokenInterceptor} from './shared/services/auth/token-interceptor';
import {RegisterModule} from './components/register/register.module';
import {ManageModule} from './components/manage/manage.module';
import {UserProfileModule} from './components/user-profile/user-profile.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MainpageuserModule,
    NotfoundRoutingModule,
    InputTextModule,
    ShellModule,
    LoginModule,
    RegisterModule,
    ButtonModule,
    ManageModule,
    UserProfileModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
