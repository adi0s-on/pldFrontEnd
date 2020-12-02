import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { DiaryService } from 'src/app/shared/services/diary.service';
import { Diaries } from 'src/app/shared/models/diaries.model';

@Component({
  selector: 'app-remove-form-diary',
  templateUrl: './remove-form-diary.component.html',
  styleUrls: ['./remove-form-diary.component.css']
})
export class RemoveFormDiaryComponent implements OnInit {

  @Input() diary: Diaries;
  @Output() closeModal = new EventEmitter<boolean>();

  removeDiaryForm: FormGroup;

  constructor(private diaryService: DiaryService) { }

@HostListener('document:keydown.enter',['$event'])
onClick(event: any): void{
  this.submit();
}


  ngOnInit(): void {
  }

  submit(): void{
    this.diaryService.deleteDiary(this.diary.Id).then(() =>{
      this.closeModal.emit(true);
    });
  }

}
