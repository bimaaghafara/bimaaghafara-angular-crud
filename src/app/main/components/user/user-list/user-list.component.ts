import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';

// service
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users;
  columns = ['userName', 'firstName', 'lastName'];
  constructor(
    @Inject(NgZone) private zone: NgZone,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getUsers(null, null).subscribe( users => {
      console.log(users);
      this.users = users;
    });
  }

}
