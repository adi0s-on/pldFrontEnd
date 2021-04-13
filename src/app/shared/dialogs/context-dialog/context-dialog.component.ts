import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalPosition} from '../../utils/modal-position.enum';
import {ModalType} from '../../utils/modal-type.enum';
import {Diaries} from '../../models/diaries.model';
import {DiaryService} from '../../services/diary.service';

@Component({
  selector: 'app-context-dialog',
  templateUrl: './context-dialog.component.html',
  styleUrls: ['./context-dialog.component.scss']
})
export class ContextDialogComponent implements OnInit {

  @Input() displayModal = false;

  @Input() modalType: ModalType;

  @Output() modalClosed = new EventEmitter<boolean>();

  @Input() diary: Diaries;

  ModalPosition = ModalPosition;

  ModalType = ModalType;

  titleMap = new Map([
    [ModalType.EDITING, 'Edit'],
    [ModalType.ADDING, 'Add'],
    [ModalType.REMOVING, 'Remove'],
    [ModalType.EXERCISE_ADD, 'Add exercise'],
    [ModalType.EXERCISE_DETAILS_ADD, 'Add exercise details'],
    [ModalType.EXERCISE_EQUIPMENT_ADD, 'Add exercise details'],
    [ModalType.DAYS, 'Days']
  ]);

  classMap = new Map([
    [ModalType.EDITING, 'p-warning'],
    [ModalType.ADDING, 'p-success'],
    [ModalType.REMOVING, 'p-danger'],
    [ModalType.EXERCISE_ADD, 'p-success'],
    [ModalType.EXERCISE_DETAILS_ADD, 'p-success'],
    [ModalType.EXERCISE_EQUIPMENT_ADD, 'p-success'],
    [ModalType.DAYS, 'p-success']
  ]);

  loading = false;

  constructor(private _diaryService: DiaryService) {
    this._diaryService.currentDiary$.subscribe((diary) => {
      this.diary = diary;
    })
  }

  ngOnInit(): void {
  }

  closeModal(event: any): void {
    this.modalClosed.emit(false);
    this._diaryService.setCurrentDiary(null);
  }

  isTypeOf(typeName: ModalType): boolean {
    return typeName === this.modalType;
  }
}
