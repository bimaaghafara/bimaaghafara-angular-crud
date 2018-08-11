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

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.loginService.isLogin();
  }

}
