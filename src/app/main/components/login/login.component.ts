import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model = {
   userName: '', password: ''
  };

  isValid = {
    userName: true, password: true
  };

  errorMessage = '';

  constructor(
    @Inject(NgZone) private zone: NgZone,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loginService.getUsers(null, null).subscribe( user => {
      // console.log(user[0].id);
      // console.log(user);
    });
  }

  async doLogin(userName, password) {
    const isLogin = await this.loginService.login(userName, password);
    // console.log(isLogin);
    if (isLogin) {
      console.clear();
      console.log('Login success!');
      this.router.navigate(['/users']);
    } else {
      this.errorMessage = '** Username / Password is wrong!';
    }
  }

  onSubmit() {
    console.log('Submit login!');
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
