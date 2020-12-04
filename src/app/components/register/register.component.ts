import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';

const CrossFieldValidator: ValidatorFn = (fg: FormGroup) => {
  const _password = fg.get('password').value;
  const _confirmPassword = fg.get('confirmPassword').value;

  return _password === _confirmPassword ? { pEqual: true } : { pEqual: false };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  Name: FormControl;
  Surname: FormControl;
  City: FormControl;
  userName: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  constructor(private _formBuilder: FormBuilder,
              private _userService: UserService) { }

  createFormControls(): void {
    this.Name = new FormControl('', [ Validators.required ]);
    this.Surname = new FormControl('', [ Validators.required ]);
    this.City = new FormControl('', [ Validators.required ]);
    this.userName = new FormControl('', [ Validators.required ]);
    this.password = new FormControl('', [ Validators.required ]);
    this.confirmPassword = new FormControl('', [ Validators.required ]);
  }

  createForm(): void {
    this.registerForm = this._formBuilder.group({
      Name: this.Name,
      Surname: this.Surname,
      City: this.City,
      userName: this.userName,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, {
      validators: [ CrossFieldValidator ]
    })
  }

  register(data: any): void {
    this._userService.register(data);
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

}
