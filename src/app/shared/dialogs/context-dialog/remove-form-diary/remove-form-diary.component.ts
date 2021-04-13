import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { DiaryService } from 'src/app/shared/services/diary.service';
import { Diaries } from 'src/app/shared/models/diaries.model';

@Component({
  selector: 'app-remove-form-diary',
  templateUrl: './remove-form-diary.component.html',
  styleUrls: ['./remove-form-diary.component.scss']
})
export class RemoveFormDiaryComponent implements OnInit {

  @Output() closeModal = new EventEmitter<boolean>();

  diary: Diaries;

  removeDiaryForm: FormGroup;

  constructor(private diaryService: DiaryService,
              private formBuilder: FormBuilder) {
    this.diaryService.currentDiary$.subscribe((res: Diaries) => {
      if (res) {
        this.diary = res;

      }
    });
  }

  ngOnInit(): void {
    this.removeDiaryForm = this.formBuilder.group({});
  }

  submit(): void{
    this.diaryService.deleteDiary(this.diary.Id).then(() =>{
      this.closeModal.emit(true);
    });
  }

}
