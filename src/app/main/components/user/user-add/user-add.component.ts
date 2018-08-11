import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// service
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  model = {
    userName: '', firstName: '', lastName: '', active: false, password: '', confirmPassword: ''
  };

  isValid = {
    userName: true, firstName: true, lastName: true, password: true, confirmPassword: true
  };

  isAllowSubmit = false;

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.loginService.isLogin();
  }

  doValidation() {
    this.isAllowSubmit = true;
    const modelKeys = ['userName', 'firstName', 'lastName', 'password', 'confirmPassword'];
    modelKeys.map(modelKey => {
      this.isValid[modelKey] = this.model[modelKey] ? true : false;
      this.isAllowSubmit = this.isAllowSubmit && this.model[modelKey];
    });
    this.isAllowSubmit = this.isAllowSubmit ? true : false;
  }

  onSubmit() {
    this.doValidation();
    console.log('Button add user was clicked!');
    console.log(this.isAllowSubmit);
  }

  onCancel() {
    console.log(this.model);
  }

}
