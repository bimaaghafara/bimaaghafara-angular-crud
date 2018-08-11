import { Component, OnInit, OnDestroy, Inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';

// service
import { LoginService } from '../../services/login.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  model = {
   userName: '', password: ''
  };

  isValid = {
    userName: true, password: true
  };

  errorMessage;

  constructor(
    @Inject(NgZone) private zone: NgZone,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    console.log(this.localStorageService.get('isNotLoginMessage'));
    if (!this.localStorageService.get('isNotLoginMessageRead')) {
      const isNotLoginMessage = this.localStorageService.get('isNotLoginMessage');
      this.errorMessage = isNotLoginMessage ? isNotLoginMessage : '';
    }
    this.localStorageService.set('isNotLoginMessageRead', true);
  }

  ngOnDestroy() {
    this.localStorageService.remove('isNotLoginMessage');
  }

  async doLogin(userName, password) {
    const user = await this.loginService.authUser(userName, password);
    const isLogin = user.length > 0 ? true : false;
    // console.log(isLogin);
    if (isLogin) {
      console.clear();
      console.log('Login success!');
      this.localStorageService.set('user', user[0]);
      // use location.href to reload, so data from localStorage is refereshed
      location.href = '/users';
      // this.router.navigate(['/users']);
    } else {
      this.errorMessage = '** Username / Password is wrong!';
    }
  }

  onSubmit() {
    console.log('Button login was clicked!');
    const userName = this.model.userName;
    const password = this.model.password;
    this.isValid.userName = userName ? true : false;
    this.isValid.password = password ? true : false;
    if (userName && password) {
      // console.log('username & password is not empty');
      this.doLogin(userName, password);
    } else {
      this.errorMessage = '** Username / Password is empty!';
    }
  }

}
