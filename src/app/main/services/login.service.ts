import { Http, Response, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()

export class LoginService {
    usersUrl = 'http://localhost:3000/users';

    constructor(
        private http: Http,
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

}
