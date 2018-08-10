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

  async isLogin(userName, password){
    let isLogin = await this.loginService.login(userName, password);
    // console.log(isLogin);
    if (isLogin) {
      this.router.navigate(['/users']);
    } else {
      let errorMessage = 'Username / Password Salah!'
      console.log(errorMessage);
    }
  }

  onSubmit(){
    console.log('submit!');
    console.log(this.model);
    this.isLogin(this.model.userName, this.model.password);
  }

}
