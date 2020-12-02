import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ShellModule} from './components/shell/shell.module';
import {LoginModule} from './components/login/login.module';
import {MainpageuserModule} from './components/mainpageuser/mainpageuser.module';
import {NotfoundRoutingModule} from './components/notfound/notfound-routing.module';

@NgModule({
  declarations: [
    AppComponent,
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
    AppRoutingModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
