import { Http, Response, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

@Injectable()

export class LoginService {
    usersUrl = 'http://localhost:3000/users';

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    async authUser(userName, password) {
        const options: RequestOptionsArgs = {
            params: {
                userName: userName,
                password: password,
            }
        };
        const user = await this.http.get(this.usersUrl, options).pipe(
            map(res => res.json())
        ).toPromise();
        return user;
    }

    isLogin() {
        const isLogin = this.localStorageService.get('user') ? true : false;
        if (!isLogin) {
        this.localStorageService.set('isNotLoginMessage', 'You are not login!');
        this.localStorageService.set('isNotLoginMessageRead', false);
        this.router.navigate(['/login']);
        }
    }

}
