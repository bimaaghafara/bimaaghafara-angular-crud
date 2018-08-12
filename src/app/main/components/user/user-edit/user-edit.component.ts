import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 3rd library
import * as moment from 'moment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// service
import { LocalStorageService } from 'angular-2-local-storage';
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';

// model
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user = new User();
  model = {
    userName: '', firstName: '', lastName: '', active: false, password: '', confirmPassword: ''
  };
  isValid = {
    userName: true, firstName: true, lastName: true, password: true, confirmPassword: true
  };
  isAllowSubmit = false;
  isUserNameUsed = false;
  prevUserName;
  userId;

  constructor(
    private localStorageService: LocalStorageService,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
  ) { }

  ngOnInit() {
    this.loginService.isLogin();
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
      this.userService.getUser(this.userId).subscribe(user => {
        delete user[0].id;
        this.model = Object.assign(this.model, user[0]);
        this.prevUserName = user[0].userName;
        // console.log(this.model);
      });
    });
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

  doSaveUser() {
    this.spinnerService.show();
    const currentUser: User = this.localStorageService.get('user');
    this.user = Object.assign(this.user, this.model);
    this.user.lastModifiedBy = `${currentUser.firstName} ${currentUser.lastName}`;
    this.user.lastModifiedDate = moment().format('DD/MM/YYYY HH:mm');
    // console.log(this.user);
    this.userService.editUser(this.userId, this.user).subscribe( user => {
      console.log('Edit user success!');
      setTimeout(() => {
        this.router.navigate(['/users']);
        this.spinnerService.hide();
      }, 1000);
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
        if (user.length === 0 || this.model.userName === this.prevUserName) {
          this.doSaveUser();
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
