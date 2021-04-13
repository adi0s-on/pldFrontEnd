import {Component, HostListener, OnInit} from '@angular/core';
import {User} from 'src/app/shared/models/user.model';
import {UserService} from 'src/app/shared/services/user.service';
import {HttpClient} from '@angular/common/http';
import { DiaryService } from 'src/app/shared/services/diary.service';
import { Diaries } from 'src/app/shared/models/diaries.model';
import {ModalType} from 'src/app/shared/utils/modal-type.enum'
import {AuthService} from '../../shared/services/auth/auth.service';
import {UserDetails} from '../../shared/models/user-details';

@Component({
  selector: 'app-mainpageuser',
  templateUrl: './mainpageuser.component.html',
  styleUrls: ['./mainpageuser.component.scss']
})
export class MainpageuserComponent implements OnInit {

  user: User;
  diary: Diaries;
  modalToDisplay = false;

  ModalType = ModalType;

  operationType: ModalType;

  isEditingPersonalData: boolean = false;
  isEditingUserDetails: boolean = false;

  name: string;
  surName: string;
  city: string;
  height: number;
  weight: number;
  age: number;

  _dName: string;
  _dSurName: string;
  _dCity: string;
  _dheight: number;
  _dweight: number;
  _dage: number;


  constructor(private http: HttpClient,
              private userService: UserService,
              private _diaryService: DiaryService,
              private _authService: AuthService) {
    this._diaryService.diary$.subscribe((res) => {
      this.user.Diaries = res
    });

    this.userService.user$.subscribe((res)=>{
      res.Diaries.map((diary: Diaries) => {
        diary.StartDate = (diary.StartDate.toString().replace(/\D/g, ''));
        diary.EndDate = (diary.EndDate.toString().replace(/\D/g, ''));
        diary.Days.map(day => {
          day.Date = (day.Date.toString().replace(/\D/g, ''));
        })
      });
      this.user=res;
    });

    this._authService.credentials$.subscribe((res) => {
      if (res.id) {
        this.userService.getUser(res.id).then((res) => {
          this._diaryService.setDiaries(res.Diaries);
        });
      }
    })
  }

  ngOnInit(): void {
    const credentials = this._authService.getCredentials;
    if (credentials.id) {
      this.userService.getUser(credentials.id).then();
    }
  }

  toggleModal(operationType: ModalType, diary?: Diaries): void {
    this.operationType = operationType;
    this._diaryService.setCurrentDiary(diary);
    this.modalToDisplay = true;
  }
}
