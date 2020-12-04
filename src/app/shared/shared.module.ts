import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContextDialogComponent} from './dialogs/context-dialog/context-dialog.component';
import {DialogModule} from 'primeng/dialog';
import {EditFormComponent} from './dialogs/context-dialog/edit-form-diary/edit-form.component';
import {AddFormDiaryComponent} from './dialogs/context-dialog/add-form-diary/add-form-diary.component';
import {RemoveFormDiaryComponent} from './dialogs/context-dialog/remove-form-diary/remove-form-diary.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderService} from './services/header.service';
import {TrainingDaysComponent} from './dialogs/context-dialog/training-days/training-days.component';

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule
  ],
  declarations: [
    ContextDialogComponent,
    EditFormComponent,
    AddFormDiaryComponent,
    TrainingDaysComponent,
    RemoveFormDiaryComponent
  ],
  exports: [
    ContextDialogComponent
  ],
  providers: [
    HeaderService
  ]
})
export class SharedModule {

}
