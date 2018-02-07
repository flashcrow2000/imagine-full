import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../services/user.service';
import { AuthenticationService } from './classic/authentication.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FacebookSdkService} from "./facebook/facebook-sdk.service";
import {FacebookAuthResponse} from "./facebook/facebook-auth";
import {FbUser} from "./facebook/fbuser.model";
import {User} from "../shared/user.model";
import {RedirectService} from "../services/redirect.service";
import {Http} from "@angular/http";
import {AppConfig} from "../app.config";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  @ViewChild('forgot')
    forgotEmail:ElementRef;
  invalidCreds: boolean = false;
  loginForm:FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  fbAuthResponse: FacebookAuthResponse;
  fbLoginStatus = "";
  fbUser: FbUser;
  fbRespString : any;
  forgotPassword = false;
  forgotEmailInvalid = false;
  human = false;
  forgotPasswordSuccess = false;
  forgotPasswordError = false;

  constructor(
      private route: ActivatedRoute,
      private http: Http,
      private config:AppConfig,
      private router: Router,
      private redirect: RedirectService,
      private authenticationService: AuthenticationService,
      private userService:UserService,
      private facebookSdkService: FacebookSdkService) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(
              data => {
                this.navigateToRedirect();
              },
              error => {
                this.userService.userActivated.next(false);
                this.loading = false;
                this.invalidCreds = true;
                this.model.username= '';
                this.model.password = '';
              });
  }

  // TODO move this code somewhere else, so that it's not duplicated in
  // signup.ts and login.ts
  onFBLogin() {
    this.facebookSdkService.facebookLogin().subscribe(
      fb_auth_resp => {
        this.fbAuthResponse = fb_auth_resp;
        this.fbRespString = JSON.stringify(this.fbAuthResponse);
        this.fbLoginStatus = this.facebookSdkService.fbLoginStatus;

        if (this.fbLoginStatus == "connected") {
          // get user's basic info from facebook
          this.facebookSdkService.me().subscribe(
            fbUser => {
              this.fbUser = fbUser;
              let imagineUser = new User();
              //localStorage.setItem('currentUser', JSON.stringify(fbUser));
              this.userService.loginType = 'facebook';
              this.fbUser.type = 'facebook';
              imagineUser = this.userService.convertToImagineUser(this.fbUser);
              this.facebookSdkService.getProfilePicture(imagineUser.fb_user_id).subscribe(
                (response) => {
                  imagineUser.imgURL = response['data'].url;
                  this.userService.create(imagineUser)
                    .subscribe(
                      data => {
                        let tempJson:any = JSON.parse(data["_body"]);
                        // pass 'true' so that we copy all the information from the database over to
                        // the user object
                        imagineUser = this.userService.convertDBUserToImagine(tempJson, true);
                        //imagineUser.token = JSON.parse(data["_body"]).token;
                        //imagineUser._id = JSON.parse(data["_body"])._id;
                        this.onFBLoginSuccess(imagineUser);
                        this.navigateToRedirect();

                      },
                      error => {
                        if (error._body.indexOf('already taken') > -1) {
                          // Fetch the user from database, and use that instead
                          // so we don't lose the information already stored
                          // https://iwithorg.atlassian.net/browse/IM-63
                          this.onFBLoginSuccess(imagineUser);
                          this.navigateToRedirect();
                        } else {
                          this.loading = false;
                        }
                      })
                }
              );

            });
        }
      }
    );
  }

  showForgotPassword() {
    this.forgotPassword = true;
  }

  emailValidator(email:string): boolean {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!EMAIL_REGEXP.test(email)) {
      return false;
    }
    return true;
  }

  handleCaptcha(ev) {
    this.http.post(this.config.apiUrl + '/users/validate', {token: ev}).subscribe(
      data => {
        if (data['_body'] == 'human') {
          this.human = true;
        }
      },
      error => {
        // todo show a message informing the user that captcha verification failed.
      }
    )
  }

  sendForgotPassword() {
    let val = this.forgotEmail.nativeElement.value;
    if (this.emailValidator(val)) {
      this.userService.forgotPassword(val)
        .subscribe(
          data => {
            this.forgotPassword = false;
            this.forgotPasswordSuccess = true;
          },
          error => {
            this.forgotPassword = false;
            this.forgotPasswordError = true;
          }
        )
    } else {
      this.forgotEmailInvalid = true;
    }


  }

  navigateToRedirect() {
    let redirectURL = this.redirect.getRedirect() ? this.redirect.getRedirect() : '/';
    this.redirect.resetRedirectURL();
    this.router.navigate([redirectURL ? redirectURL : '/'])
  }

  onFBLoginSuccess(user:User) {
    this.userService.loginType = 'facebook';
    this.userService.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userService.userActivated.next(true);
  }

}
