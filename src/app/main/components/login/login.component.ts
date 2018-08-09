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
    this.loginService.getPosts().subscribe( post => {
      console.log(post);
    });
  }

}
