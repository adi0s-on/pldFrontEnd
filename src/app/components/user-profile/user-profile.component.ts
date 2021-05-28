import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth/auth.service';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user.model';
import {Diaries} from '../../shared/models/diaries.model';
import {UserDetails} from '../../shared/models/user-details';
import {SassHelperService} from '../../shared/services/sass-helper.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  isEditingPersonalData: boolean = false;
  isEditingUserDetails: boolean = false;

  name: string;
  surName: string;
  city: string;
  weight: number;
  height: number;
  age: number;

  _dName: string;
  _dSurName: string;
  _dCity: string;
  _dheight: number;
  _dweight: number;
  _dage: number;

  user: User;

  avatar: File;
  avatarUrl: string;

  constructor(private _authService: AuthService,
              private _userService: UserService,
              private _sassHelperService: SassHelperService) {
    this._userService.user$.subscribe((res) => {
      res.Diaries.map((diary: Diaries) => {
        diary.StartDate = (diary.StartDate.toString().replace(/\D/g, ''));
        diary.EndDate = (diary.EndDate.toString().replace(/\D/g, ''));
        diary.Days.map(day => {
          day.Date = (day.Date.toString().replace(/\D/g, ''));
        })
      });
      this.user=res;
    });
  }

  ngOnInit(): void {
    const credentials = this._authService.getCredentials;
    if (credentials.id) {
      this._userService.getUser(credentials.id).then((res) => {
        this.name = this._dName = res.Name;
        this.surName = this._dSurName = res.Surname;
        this.city = this._dCity = res.City;
        this.height = this._dheight = res.UserDetails.Height;
        this.weight = this._dweight = res.UserDetails.Weight;
        this.age = this._dage = res.UserDetails.Age;
        if (res.UserDetails.Avatar) {
          this.avatarUrl = 'data:image/jpeg;base64,' + res.UserDetails.Avatar.Image;
        }
      });
    }
  }

  cancelPersonalChanges(): void {
    this.isEditingPersonalData = false;
    this.name = this._dName;
    this.surName = this._dSurName;
    this.city = this._dCity;
  }

  acceptPersonalChanges(): void {
    this._userService.update({Id: this.user.Id, Name: this.name, Surname: this.surName, City: this.city}).then((res: User) => {
      this.isEditingPersonalData = false;
      this._dName = res.Name;
      this._dSurName = res.Surname;
      this._dCity = res.City;
    })
  }

  cancelDetailsChanges(): void {
    this.isEditingUserDetails = false;
    this.height = this._dheight;
    this.weight = this._dweight;
    this.age = this._dage;

  }

  acceptDetailsChanges(): void {
    this._userService.updateDetails({
      UserId: this.user.Id,
      Height: this.height,
      Weight: this.weight,
      Age: this.age
    }).then((res: UserDetails) => {
      this.isEditingUserDetails = false;
      this._dheight = res.Height;
      this._dweight = res.Weight;
      this._dage = res.Age;

    })
  }

  uploadFile(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e);
    reader.onload = () => {
      this.avatarUrl = reader.result.toString();
      this.avatar = e;
    };
  }


  shouldDeleteAvatarFromProfile(): void {
    !!this.user.UserDetails.Avatar?.Image ? this.deleteAvatar() : this.deleteFile();
  }

  deleteAvatar(): void {
    this._userService.deleteAvatar(this.user.UserDetails.Avatar.Id).subscribe(() => {
      this.avatar = null;
      this.avatarUrl = null;
    })
  }

  deleteFile() {
    this.avatar = null;
    this.avatarUrl = null;
  }

  saveFile(): void {
    this._userService.addOrUpdateAvatar(+this.user.Id, this.avatarUrl.slice(this.avatarUrl.indexOf(',') + 1)).subscribe((res) => {
      this.avatarUrl = res.Image ? 'data:image/jpeg;base64,' + res.Image : '';
      this.avatar = null;
    });
  }
}

