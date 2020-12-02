import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Diaries } from 'src/app/shared/models/diaries.model';
import { DiaryService } from 'src/app/shared/services/diary.service';

@Component({
  selector: 'app-add-form-diary',
  templateUrl: './add-form-diary.component.html',
  styleUrls: ['./add-form-diary.component.css']
})
export class AddFormDiaryComponent implements OnInit {

@Input() diary: Diaries;
@Output() closeModal = new EventEmitter<boolean>();

addDiaryForm: FormGroup;

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
    private diaryService: DiaryService) { }

  
  @HostListener('document:keydown.enter', ['$event'])
  onClick(event: KeyboardEvent): void {
      this.submit(this.addDiaryForm.value);
  }


  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls(): void{
    this.StartDate = new FormControl('', [Validators.required]);
    this.EndDate = new FormControl('', [Validators.required]);
    this.Conclusions = new FormControl('', [Validators.required]);
    this.BenchPressStart = new FormControl('', [Validators.required]);
    this.SquatStart = new FormControl('', [Validators.required]);
    this.DeadliftStart = new FormControl('', [Validators.required]);
    this.BenchPressEnd = new FormControl('', [Validators.required]);
    this.SquatEnd = new FormControl('', [Validators.required]);
    this.DeadliftEnd = new FormControl('', [Validators.required]);
    this.Progress = new FormControl('', [Validators.required]);
    this.Days = new FormControl('', [Validators.required]);
  }
  
  createForm(): void{
    this.addDiaryForm = this.formBuilder.group({
      StartDate: this.StartDate,
      EndDate: this.EndDate,
      Conclusions: this.Conclusions,
      BenchPressStart: this.BenchPressStart,
      SquatStart: this.SquatStart,
      DeadliftStart: this.DeadliftStart,
      BenchPresEnd: this.BenchPressEnd,
      SquatEnd: this.SquatEnd,
      DeadliftEnd: this.DeadliftEnd,
      Progress: this.Progress,
      Days: this.Days,
    })
  }

  submit(formValue: any): void{
    this.addDiaryForm.markAllAsTouched();
    this.addDiaryForm.markAsDirty();
    if(this.addDiaryForm.valid){
      this.diaryService.addDiary(formValue).then((res) =>{
        this.addDiaryForm.reset();
        this.closeModal.emit(true);
      })
    }
  }

}
