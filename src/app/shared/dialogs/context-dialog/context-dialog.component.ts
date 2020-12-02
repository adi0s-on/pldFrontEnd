import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalPosition} from '../../utils/modal-position.enum';
import {ModalType} from '../../utils/modal-type.enum';
import {Diaries} from '../../models/diaries.model';

@Component({
  selector: 'app-context-dialog',
  templateUrl: './context-dialog.component.html',
  styleUrls: ['./context-dialog.component.css']
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
    [ModalType.REMOVING, 'Remove']
  ]);

  classMap = new Map([
    [ModalType.EDITING, 'p-warning'],
    [ModalType.ADDING, 'p-success'],
    [ModalType.REMOVING, 'p-danger']
  ]);

  loading = false;

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(event: any): void {
    this.modalClosed.emit(false);
  }

  isTypeOf(typeName: ModalType): boolean {
    return typeName === this.modalType;
  }
}
