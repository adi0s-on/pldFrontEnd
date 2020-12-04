import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Diaries} from 'src/app/shared/models/diaries.model';
import {DiaryService} from 'src/app/shared/services/diary.service';
import {Day} from '../../../models/day.model';

@Component({
  selector: 'app-training-days',
  templateUrl: './training-days.component.html',
  styleUrls: ['./training-days.component.css']
})
export class TrainingDaysComponent implements OnInit {

  @Input() diary: Diaries;

  @Output() closeModal = new EventEmitter<boolean>();

  currentDay: Day;

  constructor() {
  }

  setCurrentDay(day: Day) {
    this.currentDay = day;
    console.log(day.TrainingUnits)
    console.log(day)
  }

  // @HostListener('document:keydown.enter', ['$event'])
  // onClick(event: KeyboardEvent): void {
  //   this.submit(this.addDiaryForm.value);
  // }


  ngOnInit(): void {
  }



}
