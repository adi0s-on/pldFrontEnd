import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  userName: FormControl;
  password: FormControl;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls(): void {
    this.userName = new FormControl('', [ Validators.required ]);
    this.password = new FormControl('', [ Validators.required, Validators.minLength(6) ]);
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: this.userName,
      password: this.password,
    })
  }

  login(formData): void {
    this.userService.login(formData);
  }
}
