import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainpageuserComponent } from './components/mainpageuser/mainpageuser.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AddFormDiaryComponent } from './shared/dialogs/context-dialog/add-form-diary/add-form-diary.component';
import { EditFormComponent } from './shared/dialogs/context-dialog/edit-form-diary/edit-form.component';
import { RemoveFormDiaryComponent } from './shared/dialogs/context-dialog/remove-form-diary/remove-form-diary.component';
import { ContextDialogComponent } from './shared/dialogs/context-dialog/context-dialog.component';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent,
    MainpageuserComponent,
    NotfoundComponent,
    AddFormDiaryComponent,
    EditFormComponent,
    RemoveFormDiaryComponent,
    ContextDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
