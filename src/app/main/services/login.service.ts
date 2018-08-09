import { Http, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable()
export class LoginService {
    constructor(private _http: Http) { }

    getPosts() {
        const url = 'http://localhost:3000/posts';
        return this._http.get(url, {params: {'_page': 2, '_limit': 3}}).pipe(
            map(res => res.json())
        );
    }
}
