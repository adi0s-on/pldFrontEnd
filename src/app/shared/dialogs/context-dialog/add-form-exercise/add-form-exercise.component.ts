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
  selector: 'app-add-form-exercise',
  templateUrl: './add-form-exercise.component.html',
  styleUrls: ['./add-form-exercise.component.css']
})
export class AddFormExerciseComponent implements OnInit {

  @Output() closeModal = new EventEmitter<boolean>();

  currentDate: any;

  addExerciseForm: FormGroup;

  Name: FormControl;
  Description: FormControl;
  ExerciseEquipment: FormControl;

  exerciseEquipments: ExerciseEquipment[] = [];

  constructor(private formBuilder: FormBuilder,
              private diaryService: DiaryService,
              private _authService: AuthService,
              private _exerciseService: ExerciseService) {
    this._exerciseService.exerciseEquipment$.subscribe((res: ExerciseEquipment[]) => {
      this.exerciseEquipments = res;
    })
  }


  @HostListener('document:keydown.enter', ['$event'])
  onClick(event: KeyboardEvent): void {
    this.submit(this.addExerciseForm.value);
  }


  ngOnInit(): void {
    this.currentDate = new Date().toLocaleDateString('en-EN');
    this.createFormControls();
    this.createForm();
  }

  createFormControls(): void {
    this.Name = new FormControl('', [ Validators.required ]);
    this.Description = new FormControl('', [ Validators.required ]);
    this.ExerciseEquipment = new FormControl(null, [ Validators.required ]);
  }

  createForm(): void {
    this.addExerciseForm = this.formBuilder.group({
      Name: this.Name,
      Description: this.Description,
      ExerciseEquipment: this.ExerciseEquipment
    })
  }

  submit(formValue: Exercise): void {
    console.log(formValue)
    const data = {
      Name: formValue.Name,
      Description: formValue.Description,
      ExerciseEquipmentId: formValue.ExerciseEquipment.Id
    };

    this._exerciseService.createNewExercise(data).then(() => {
      this.addExerciseForm.reset();
      this.closeModal.emit(true);
    })
  }

}
