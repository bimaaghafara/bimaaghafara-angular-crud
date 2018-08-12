import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// 3rd library
import * as moment from 'moment';

// service
import { LocalStorageService } from 'angular-2-local-storage';
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';

// model
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  user = new User();
  model = {
    userName: '', firstName: '', lastName: '', active: false, password: '', confirmPassword: ''
  };

  isValid = {
    userName: true, firstName: true, lastName: true, password: true, confirmPassword: true
  };

  isAllowSubmit = false;
  isUserNameUsed = false;

  constructor(
    private localStorageService: LocalStorageService,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
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
      if (modelKey === 'confirmPassword') {
        this.isValid.confirmPassword = this.model.password === this.model.confirmPassword && !!this.model.confirmPassword ? true : false;
        this.isAllowSubmit = this.isAllowSubmit && this.isValid.confirmPassword;
      }
    });
    this.isAllowSubmit = this.isAllowSubmit ? true : false;
  }

  doAddUser() {
    const currentUser: User = this.localStorageService.get('user');
    this.user = Object.assign(this.user, this.model);
    this.user.lastModifiedBy = `${currentUser.firstName} ${currentUser.lastName}`;
    this.user.lastModifiedDate = moment().format('DD/MM/YYYY HH:mm');
    // console.log(this.user);
    this.userService.addUser(this.user).subscribe( user => {
      console.log('Add new user success!');
      this.router.navigate(['/users']);
    });
  }

  onSubmit() {
    console.clear();
    this.doValidation();
    console.log('Button add user was clicked!');
    // console.log(this.isAllowSubmit);
    // console.log(this.model);
    if (this.isAllowSubmit) {
      this.userService.getUserByUsername(this.model.userName).subscribe(user => {
        if (user.length === 0 ) {
          this.doAddUser();
        } else {
          this.isUserNameUsed = true;
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/users']);
  }

}
