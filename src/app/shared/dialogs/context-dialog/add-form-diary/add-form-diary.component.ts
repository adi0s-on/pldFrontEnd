import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Diaries} from 'src/app/shared/models/diaries.model';
import {DiaryService} from 'src/app/shared/services/diary.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-add-form-diary',
  templateUrl: './add-form-diary.component.html',
  styleUrls: ['./add-form-diary.component.scss']
})
export class AddFormDiaryComponent implements OnInit {

  @Input() diary: Diaries;
  @Output() closeModal = new EventEmitter<boolean>();

  currentDate: any;

  addDiaryForm: FormGroup;

  UserId: FormControl;
  StartDate: FormControl;
  EndDate: FormControl;
  Conclusions: FormControl;
  BenchPressStart: FormControl;
  SquatStart: FormControl;
  DeadliftStart: FormControl;
  BenchPressEnd: FormControl;
  SquatEnd: FormControl;
  DeadliftEnd: FormControl;
  Progress: FormControl;
  Days: FormControl;

  constructor(private formBuilder: FormBuilder,
              private diaryService: DiaryService,
              private _authService: AuthService) {
  }


  @HostListener('document:keydown.enter', ['$event'])
  onClick(event: KeyboardEvent): void {
    this.submit(this.addDiaryForm.value);
  }


  ngOnInit(): void {
    this.currentDate = new Date().toLocaleDateString('en-EN');
    this.createFormControls();
    this.createForm();
  }

  createFormControls(): void {
    this.UserId = new FormControl(this._authService._credentials.id, [ Validators.required ]);
    this.StartDate = new FormControl(null, [ Validators.required ]);
    this.EndDate = new FormControl(null, []);
    this.Conclusions = new FormControl(null, []);
    this.BenchPressStart = new FormControl(null, [ Validators.required ]);
    this.SquatStart = new FormControl(null, [ Validators.required ]);
    this.DeadliftStart = new FormControl(null, [ Validators.required ]);
    this.BenchPressEnd = new FormControl(null, []);
    this.SquatEnd = new FormControl(null, []);
    this.DeadliftEnd = new FormControl(null, []);
    this.Progress = new FormControl(null, []);
    this.Days = new FormControl(null, []);
  }

  createForm(): void {
    this.addDiaryForm = this.formBuilder.group({
      UserId: this.UserId,
      StartDate: this.StartDate,
      EndDate: this.EndDate,
      Conclusions: this.Conclusions,
      BenchPressStart: this.BenchPressStart,
      SquatStart: this.SquatStart,
      DeadliftStart: this.DeadliftStart,
      BenchPressEnd: this.BenchPressEnd,
      SquatEnd: this.SquatEnd,
      DeadliftEnd: this.DeadliftEnd,
      Progress: this.Progress,
      Days: this.Days,
    })
  }

  submit(formValue: any): void {
    this.addDiaryForm.markAllAsTouched();
    this.addDiaryForm.markAsDirty();
    if (this.addDiaryForm.valid) {
      formValue.StartDate = new Date(formValue.StartDate).toISOString();
      console.log(formValue)
      this.diaryService.addDiary(formValue).then((res) => {
        this.addDiaryForm.reset();
        this.closeModal.emit(true);
      })
    }
  }

}
