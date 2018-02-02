import {Component} from "@angular/core";
import { Router } from '@angular/router';

import { User } from "../../shared/user.model";
import { UserService } from "../../services/user.service";



// Google's login API namespace
declare const gapi:any;

@Component({
    selector: "app-google-login",
    templateUrl: "./google-login.component.html"
})
export class GoogleLoginComponent {
  googleLoginButtonId = "google-login-button";
  userAuthToken = null;

  constructor(private userService:UserService,
              private router:Router) {
    this.userService.googleAccountLogout.subscribe(
      (logout: boolean) => { logout ? this.onGoogleLogout : false}
    )

  }

  // Angular hook that allows for interaction with elements inserted by the
  // rendering of a view.
  ngAfterViewInit() {
    // Converts the Google login button stub to an actual button.
    gapi.signin2.render(
      this.googleLoginButtonId,
      {
        "onSuccess": this.onLoginSuccess,
        "onError": this.onLoginError,
        "scope": "profile",
        "theme": "dark"
      });
  }

  // Triggered after a user successfully logs in using the Google external
  // login provider.
  onLoginSuccess = (loggedInUser) => {
    let profile = loggedInUser.getBasicProfile();
    let tUser:User = new User();
    tUser.username = tUser.g_user_id = profile.getId();
    tUser.g_first_name  = profile.getGivenName();
    tUser.g_last_name  = profile.getFamilyName();
    tUser.email  = profile.getEmail();
    //disable for now, there are some bugs in the Google login API
    // when working with single page applications.
    return;
    /*
    this.userService.create(tUser)
        .subscribe(
          data => {
              console.log('Google register success');
              this.onGoogleLoginSuccess(tUser);
              this.router.navigate(['/ideas']);
          },
          error => {
              console.log('Google register error:', error._body);
              if (error._body.indexOf('already taken') > -1) {
                console.log('Google account already connected')
                this.onGoogleLoginSuccess(tUser);
                this.router.navigate(['/ideas']);
              } else {
                //this.loading = false;
              }
          });
    console.log('google user:', tUser);
    */
  }

  onGoogleLoginSuccess(user:User) {
    console.log('user logged in');
    this.userService.loginType = 'google';
    this.userService.userActivated.next(true);
    this.userService.currentUser = user;
    //localStorage.setItem('currentUser', JSON.stringify(user));
  }

  onLoginError(error) {
    console.log(error);
  }
  onGoogleLogout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('G User signed out.');
    });
  }
G }
