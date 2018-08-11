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
  columns = [
    {name: 'userName', label: 'Username'},
    {name: 'firstName', label: 'First Name'},
    {name: 'lastName', label: 'Last Name'},
    {name: 'active', label: 'Active'},
    {name: 'lastModifiedBy', label: 'Last Modified By'},
    {name: 'lastModifiedDate', label: 'Last Modified Date'},
  ];
  isSelectAll = false;
  selectedUsers = [];
  constructor(
    @Inject(NgZone) private zone: NgZone,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getUsers(null, null).subscribe( users => {
      // console.log(users);
      this.users = users;
    });
  }

  toggleSelectAll() {
    this.isSelectAll = !this.isSelectAll;
    // console.log(this.isSelectAll);
    if (this.isSelectAll) {
      this.selectedUsers = this.users.map(user => {
        return user.id;
      });
    } else {
      this.selectedUsers = [];
    }
    // console.log(this.selectedUsers);
  }

  selectUser(e, id) {
    // console.log(e.target.checked + ' : ' + id);
    if (e.target.checked) {
      this.selectedUsers.push(id);
    } else {
      const index = this.selectedUsers.indexOf(id);
      this.selectedUsers.splice(index, 1);
    }
    // console.log(this.selectedUsers);
  }

  console(x) {
    console.log(x);
  }
}
