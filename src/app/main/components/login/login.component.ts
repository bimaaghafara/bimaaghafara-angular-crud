import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    @Inject(NgZone) private zone: NgZone,
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.loginService.getUsers(null, null).subscribe( post => {
      console.log(post);
    });

    this.isLogin('user1', 'admin');
  }

  async isLogin(userName, password){
    let isLogin = await this.loginService.login(userName, password);
    console.log(isLogin);
  }

}
