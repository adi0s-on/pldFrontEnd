import {Component, HostListener, OnInit} from '@angular/core';
import {User} from 'src/app/shared/models/user.model';
import {UserService} from 'src/app/shared/services/user.service';
import {HttpClient} from '@angular/common/http';
import { DiaryService } from 'src/app/shared/services/diary.service';
import { Diaries } from 'src/app/shared/models/diaries.model';
import {ModalType} from 'src/app/shared/utils/modal-type.enum'
import {AuthService} from '../../shared/services/auth/auth.service';

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
              private diaryService: DiaryService,
              private _authService: AuthService) {
    this.userService.user$.subscribe((res)=>{
      this.user=res;
    });

    this._authService.credentials$.subscribe((res) => {
      if (res.id) {
        this.userService.getUser(res.id);
      }
    })
  }

  ngOnInit(): void {
    const credentials = this._authService.getCredentials;
    if (credentials.id) {
      this.userService.getUser(credentials.id);
    }
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
