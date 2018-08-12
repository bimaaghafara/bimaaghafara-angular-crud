import { Http, Response, URLSearchParams, Headers, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from '../../../../node_modules/rxjs';

// model
import { User } from '../models/user';

@Injectable()

export class UserService {
    usersUrl = 'http://localhost:3000/users';
    constructor(
        private http: Http,
    ) { }

    addUser(user): Observable<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options: RequestOptionsArgs = {};
        options.headers = headers;
        return this.http.post(this.usersUrl, user, options).pipe(
            map(res => res.json())
        );
    }

    editUser(id, editedUser) {
        const options: RequestOptionsArgs = {};
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        options.headers = headers;
        const url = this.usersUrl + '/' + id;
        const user = this.http.put(url, editedUser, options).pipe(
            map(res => res.json())
        );
        return user;
    }

    async deleteUser(id) {
        const options: RequestOptionsArgs = {};
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        options.headers = headers;
        const url = this.usersUrl + '/' + id;
        const user = await this.http.delete(url, options).pipe(
            map(res => res.json())
        ).toPromise();
        return user;
    }

    getUser(id) {
        const options: RequestOptionsArgs = {
            params: {id: id}
        };
        const user = this.http.get(this.usersUrl, options).pipe(
            map(res => res.json())
        );
        return user;
    }

    getUserByUsername(userName) {
        const options: RequestOptionsArgs = {
            params: {userName: userName}
        };
        const user = this.http.get(this.usersUrl, options).pipe(
            map(res => res.json())
        );
        return user;
    }

    getUsers(page, limit): Observable<User[]> {
        const options: RequestOptionsArgs = {
            params: {
                _page: page,
                _limit: limit,
            }
        };
        return this.http.get(this.usersUrl, options).pipe(
            map(res => res.json())
        );
    }
}
