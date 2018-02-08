import { PLATFORM_ID, Inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Headers, RequestOptions } from '@angular/http';
@Injectable()
export class JwtService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

  }

  getJWT() {
        // create authorization header with jwt token
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
        return new RequestOptions({ headers: headers });
    }
  }
}
