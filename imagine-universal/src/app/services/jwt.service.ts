import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
@Injectable()
export class JwtService {
  getJWT() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            console.log('user has jwt token');
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}