import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Diaries} from 'src/app/shared/models/diaries.model';
import {DiaryService} from 'src/app/shared/services/diary.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

  @Input() set diary(val: Diaries) {
    this._diary = val;
    this.createFormControls();
    this.createForm();
  };

  @Output() closeModal = new EventEmitter<boolean>();

  editDiaryForm: FormGroup;
  _diary: Diaries;

  Id: FormControl;
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
              private diaryService: DiaryService) {
  }


  @HostListener('document:keydown.enter', ['$event'])
  onClick(event: KeyboardEvent): void {
    this.submit(this.editDiaryForm.value);
  }


  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls(): void {
    this.Id = new FormControl(this._diary?.Id, [Validators.required]);
    this.UserId = new FormControl({ value: this._diary?.UserId, disabled: true}, [Validators.required]);
    this.StartDate = new FormControl(this._diary?.StartDate, [Validators.required]);
    this.EndDate = new FormControl(this._diary?.EndDate, []);
    this.Conclusions = new FormControl(this._diary?.Conclusions, []);
    this.BenchPressStart = new FormControl(this._diary?.BenchPressStart, [Validators.required]);
    this.SquatStart = new FormControl(this._diary?.SquatStart, [Validators.required]);
    this.DeadliftStart = new FormControl(this._diary?.DeadliftStart, [Validators.required]);
    this.BenchPressEnd = new FormControl(this._diary?.BenchPressEnd, []);
    this.SquatEnd = new FormControl(this._diary?.SquatEnd, []);
    this.DeadliftEnd = new FormControl(this._diary?.DeadliftEnd, []);
    this.Progress = new FormControl(this._diary?.Progress, []);
    this.Days = new FormControl(this._diary?.Days, []);
  }

  createForm(): void {
    this.editDiaryForm = this.formBuilder.group({
      Id: this.Id,
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
    this.editDiaryForm.markAllAsTouched();
    if (this.editDiaryForm.valid) {
      this.diaryService.editDiary(formValue).then((res) => {
        this.editDiaryForm.reset();
        this.closeModal.emit(true);
      });
    }
  }
}
