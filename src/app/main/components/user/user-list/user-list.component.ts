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
  selectedLimit;
  limits = [5, 10, 25, 50, 100];
  maxPage;
  usersLength;
  currentPage;
  pages = [];

  constructor(
    @Inject(NgZone) private zone: NgZone,
    private userService: UserService,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentPage = 1;
    this.selectedLimit = 10;
    this.loginService.isLogin();

    // get maxPage
    this.userService.getUsers(null, null).subscribe( users => {
      this.usersLength = users.length;
      this.maxPage = Math.ceil(users.length / this.selectedLimit);
      this.loadPagination();
      // first loadData
      this.loadData(this.currentPage, this.selectedLimit);
    });
  }

  loadData(page, limit) {
    this.userService.getUsers(page, limit).subscribe( users => {
      // console.log(users);
      this.users = users;
    });
  }

  loadPagination() {
    this.pages = [];
    let leftPage, rightPage, i;
    if (this.currentPage === 1) {
      leftPage = 1; rightPage = 5;
    } else if (this.currentPage === this.maxPage) {
      leftPage = this.maxPage - 4;
      rightPage = this.maxPage;
    } else {
      leftPage = this.currentPage - 2;
      rightPage = this.currentPage + 2;
    }
    for (i = leftPage; i <= rightPage; i++ ) {
      if (i > 0 && i <= this.maxPage) {
        this.pages.push(i);
      }
    }
    // console.log(this.pages);
  }

  setLimit(limit) {
    this.currentPage = 1;
    this.loadData(this.currentPage, this.selectedLimit);
    // limit change => maxPage & pagination change
    this.maxPage = Math.ceil(this.usersLength / this.selectedLimit);
    this.loadPagination();
    // console.log(`selectedLimit : ${this.selectedLimit}`);
    // console.log(`currentPage : ${this.currentPage}`);
  }

  setCurrentPage(page) {
    if (page > 0 && page <= this.maxPage && page !== this.currentPage) {
      this.currentPage = page;
      this.loadPagination();
      this.loadData(this.currentPage, this.selectedLimit);
      // console.log(`selectedLimit : ${this.selectedLimit}`);
      // console.log(`currentPage : ${this.currentPage}`);
    }
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
        await this.userService.deleteUser(users[i].id);
        await this.userService.getUsers(null, null).toPromise().then(
          res => {
            this.ngOnInit();
          });
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
