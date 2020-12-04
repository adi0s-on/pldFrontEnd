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
import {ExerciseDetails} from '../../../models/exercise-details';

@Component({
  selector: 'app-add-form-exercise-details',
  templateUrl: './add-form-exercise-details.component.html',
  styleUrls: ['./add-form-exercise-details.component.css']
})
export class AddFormExerciseDetailsComponent implements OnInit {

  @Output() closeModal = new EventEmitter<boolean>();

  addExerciseDetailsForm: FormGroup;

  Eccentric: FormControl;
  EccentricPause: FormControl;
  Concetric: FormControl;
  ConcetricPause: FormControl;
  Series: FormControl;
  Repeats: FormControl;

  constructor(private _formBuilder: FormBuilder,
              private _exerciseService: ExerciseService) {

  }


  @HostListener('document:keydown.enter', ['$event'])
  onClick(event: KeyboardEvent): void {
    this.submit(this.addExerciseDetailsForm.value);
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls(): void {
    this.Eccentric = new FormControl(null, [ Validators.required ]);
    this.EccentricPause = new FormControl(null, [ Validators.required ]);
    this.Concetric = new FormControl(null, [ Validators.required ]);
    this.ConcetricPause = new FormControl(null, [ Validators.required ]);
    this.Series = new FormControl(null, [ Validators.required ]);
    this.Repeats = new FormControl(null, [ Validators.required ]);
  }

  createForm(): void {
    this.addExerciseDetailsForm = this._formBuilder.group({
      Eccentric: this.Eccentric,
      EccentricPause: this.EccentricPause,
      Concetric: this.Concetric,
      ConcetricPause: this.ConcetricPause,
      Series: this.Series,
      Repeats: this.Repeats,
    })
  }

  submit(formValue: ExerciseDetails): void {
    this._exerciseService.createNewExerciseDetails(formValue).then(() => {
      this.addExerciseDetailsForm.reset();
      this.closeModal.emit(true);
    })
  }

}
