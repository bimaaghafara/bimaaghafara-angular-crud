import { Component, OnInit } from '@angular/core';

// service
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.loginService.isLogin();
  }

}
