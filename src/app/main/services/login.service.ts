import { Http, Response, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from '../../../../node_modules/rxjs';

import { User } from '../models/user';

@Injectable()

export class LoginService {
    usersUrl: string = 'http://localhost:3000/users';

    constructor(
        private http: Http,
    ) { }

    async login(userName, password) {
        const options: RequestOptionsArgs = {
            params: { 
                userName: userName, 
                password: password, 
            }
        }
        let user = await this.http.get(this.usersUrl, options).pipe(
            map(res => res.json())
        ).toPromise();
        return user.length > 0? true: false;
    }

    getUsers(page, limit): Observable<User[]> {
        const options: RequestOptionsArgs = {
            params: { 
                _page: page, 
                _limit: limit, 
            }
        }
        return this.http.get(this.usersUrl, options).pipe(
            map(res => res.json())
        );
    }
}
