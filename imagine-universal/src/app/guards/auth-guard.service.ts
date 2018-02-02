import { CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { UserService } from '../services/user.service'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService:UserService,
              private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,
              state:RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
    
    let userLoggedIn:boolean = false;
    if (this.userService.currentUser && this.userService.loginType != "") {
      userLoggedIn = true;
    }

    if (!userLoggedIn) {
      this.router.navigate(['/login']);
    }

    return userLoggedIn;
  }
}