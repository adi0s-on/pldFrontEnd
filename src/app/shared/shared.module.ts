import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContextDialogComponent} from './dialogs/context-dialog/context-dialog.component';
import {DialogModule} from 'primeng/dialog';
import {EditFormComponent} from './dialogs/context-dialog/edit-form-diary/edit-form.component';
import {AddFormDiaryComponent} from './dialogs/context-dialog/add-form-diary/add-form-diary.component';
import {RemoveFormDiaryComponent} from './dialogs/context-dialog/remove-form-diary/remove-form-diary.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderService} from './services/header.service';
import {TrainingDaysComponent} from './dialogs/context-dialog/training-days/training-days.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';
import {AddFormExerciseComponent} from './dialogs/context-dialog/add-form-exercise/add-form-exercise.component';
import {DropdownModule} from 'primeng/dropdown';
import {AddFormExerciseDetailsComponent} from './dialogs/context-dialog/add-form-exercise-details/add-form-exercise-details.component';
import {AddFormExerciseEquipmentComponent} from './dialogs/context-dialog/add-form-exercise-equipment/add-form-exercise-equipment.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DragAndDropDirective} from './directive/drag-and-drop.directive';

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    FormsModule,
    DropdownModule,
    ProgressSpinnerModule
  ],
  declarations: [
    ContextDialogComponent,
    EditFormComponent,
    AddFormDiaryComponent,
    TrainingDaysComponent,
    RemoveFormDiaryComponent,
    AddFormExerciseComponent,
    AddFormExerciseDetailsComponent,
    AddFormExerciseEquipmentComponent,
    DragAndDropDirective
  ],
  exports: [
    ContextDialogComponent,
    DragAndDropDirective
  ],
  providers: [
    HeaderService
  ]
})
export class SharedModule {

}
