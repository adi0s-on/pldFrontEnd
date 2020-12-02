import {Component, HostListener, OnInit} from '@angular/core';
import {User} from 'src/app/shared/models/user.model';
import {UserService} from 'src/app/shared/services/user.service';
import {HttpClient} from '@angular/common/http';
import { DiaryService } from 'src/app/shared/services/diary.service';
import { Diaries } from 'src/app/shared/models/diaries.model';
import {ModalType} from 'src/app/shared/utils/modal-type.enum'

@Component({
  selector: 'app-mainpageuser',
  templateUrl: './mainpageuser.component.html',
  styleUrls: ['./mainpageuser.component.css']
})
export class MainpageuserComponent implements OnInit {

  user: User;
  diary: Diaries;
  modalToDisplay = false;

  ModalType = ModalType;

  operationType: ModalType;

  constructor(private http:HttpClient,
              private userService: UserService,
              private diaryService: DiaryService) {
    this.userService.user$.subscribe((res)=>{
      this.user=res;
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser(4);
  }

  toggleModal(operationType: ModalType, diary?: Diaries): void {
    this.operationType = operationType;
    this.diary = diary;
    this.modalToDisplay = true;
  }
  deleteDiary(): void{
    this.diaryService.deleteDiary('14').then();
  }

}
