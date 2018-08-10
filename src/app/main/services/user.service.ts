import { Http, Response, URLSearchParams, RequestOptionsArgs } from '@angular/http';
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
