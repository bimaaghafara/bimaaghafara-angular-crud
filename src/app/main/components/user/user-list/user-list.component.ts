import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';

// 3rd library
import swal from 'sweetalert2';

// service
import { LoginService } from '../../../services/login.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { UserService } from '../../../services/user.service';

// model
import { User } from '../../../models/user';

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
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginService.isLogin();
    this.loadData();
  }

  loadData() {
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
        return {id: user.id, userName: user.userName};
      });
    } else {
      this.selectedUsers = [];
    }
    // console.log(this.selectedUsers);
  }

  selectUser(e, user) {
    // console.log(e.target.checked + ' : ' + id);
    if (e.target.checked) {
      this.selectedUsers.push({id: user.id, userName: user.userName});
    } else {
      const index = this.selectedUsers.findIndex(
        selectedUser => selectedUser.id === user.id
      );
      this.selectedUsers.splice(index, 1);
    }
    // console.log(this.selectedUsers);
  }

  async doDelete(users) {
    const currentUser: User = this.localStorageService.get('user');
    let goToLogin = false;
    for (let i = 0; i < users.length; i++ ) {
      if (users[i].userName !== 'admin') {
        const fx = await this.userService.deleteUser(users[i].id);
        const loadData = await this.userService.getUsers(null, null).toPromise().then(
          res => this.users = res
        );
        if (currentUser.userName === users[i].userName) {
          goToLogin = true;
        }
      }
    }
    if (goToLogin) {
      this.localStorageService.remove('user');
      // use location.href to reload, so data from localStorage is refereshed
      location.href = '/login';
    }
  }

  confirmDelete(users) {
    console.log(users);
    let selectedUsers = '';
    users.map( (user, index) => {
      selectedUsers = index === users.length - 1
        ? selectedUsers + user.userName
        : selectedUsers + user.userName + ', ';
    });
    if (!selectedUsers) {
      swal(
        'You have not select any user to be deleted!\n\nTry to select some users.',
        '',
        'question'
      );
    } else {
      swal({
        title: `Are you sure to delete user with username : (${selectedUsers})?`,
        text: `\n\nYou won't be able to revert this!\n\n`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#bbb',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.doDelete(users);
          swal('Deleted!', 'Data has been deleted.', 'success');
        }
      });
    }
  }

}
