import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Diaries} from 'src/app/shared/models/diaries.model';
import {DiaryService} from 'src/app/shared/services/diary.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth/auth.service';
import {ExerciseService} from '../../../services/exercise.service';
import {ExerciseEquipment} from '../../../models/exercise-equipment';
import {Exercise} from '../../../models/exercise';

@Component({
  selector: 'app-add-form-exercise-equipment',
  templateUrl: './add-form-exercise-equipment.component.html',
  styleUrls: ['./add-form-exercise-equipment.component.css']
})
export class AddFormExerciseEquipmentComponent implements OnInit {

  @Output() closeModal = new EventEmitter<boolean>();

  addExerciseEquipmentForm: FormGroup;

  Name: FormControl;

  constructor(private formBuilder: FormBuilder,
              private _exerciseService: ExerciseService) {
  }


  @HostListener('document:keydown.enter', ['$event'])
  onClick(event: KeyboardEvent): void {
    this.submit(this.addExerciseEquipmentForm.value);
  }


  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls(): void {
    this.Name = new FormControl('', [ Validators.required ]);
  }

  createForm(): void {
    this.addExerciseEquipmentForm = this.formBuilder.group({
      Name: this.Name
    })
  }

  submit(formValue: ExerciseEquipment): void {
    this._exerciseService.createNewExerciseEquipment(formValue).then(() => {
      this.addExerciseEquipmentForm.reset();
      this.closeModal.emit(true);
    })
  }

}
