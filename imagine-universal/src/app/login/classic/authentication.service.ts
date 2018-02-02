import { PLATFORM_ID, Inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'

import { AppConfig } from '../../app.config';
import {UserService } from '../../services/user.service'

@Injectable()
export class AuthenticationService {
    constructor(@Inject(PLATFORM_ID) private platformId: Object,
                private http: Http,
                private config: AppConfig,
                private userService:UserService) { }

    login(username: string, password: string) {
        return this.http.post(this.config.apiUrl + '/users/authenticate', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.userService.loginType = 'classic';
                    this.userService.currentUser = user;
                    if (isPlatformBrowser(this.platformId)) {
                      localStorage.setItem('currentUser', JSON.stringify(user));
                    }
                    this.userService.userActivated.next(true);
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        //localStorage.removeItem('currentUser');
        this.userService.logout()
    }
}
