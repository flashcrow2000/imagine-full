import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { UserService } from '../../services/user.service';
import { FacebookSdkService } from '../../login/facebook/facebook-sdk.service';
import { FacebookAuthResponse } from '../../login/facebook/facebook-auth';
import { FbUser } from '../../login/facebook/fbuser.model';
import { User } from '../../shared/user.model';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Http} from "@angular/http";
import {AppConfig} from "../../app.config";
import {RedirectService} from "../../services/redirect.service";
import {LanguagesService} from "../../services/languages.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupScreen:boolean= true;
  signupError:boolean = false;
  signupWait:boolean = false;

  human:boolean = false;

  model: any = {
    username: '',
    password: '',
    manifestoAccepted: false,
    fbID: ''
  };

  signupForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required)
  });
  invalidForm:boolean = false;
  emailValid:boolean = false;
  passwordValid:boolean = false;
  usernameExists:boolean = false;

  loading = false;
  fbAuthResponse: FacebookAuthResponse;
  fbLoginStatus = "";
  fbUser: FbUser;
  fbRespString : any;
  returnUrl: string;
  loggedIn:boolean = false;
    availableLanguages:Object = {};
    currentLanguage: string = '';
  constructor(
      private http: Http,
      private route: ActivatedRoute,
      private langService: LanguagesService,
      private router: Router,
      private config: AppConfig,
      private userService: UserService,
      private redirect: RedirectService,
      private facebookSdkService: FacebookSdkService) { }


  ngOnInit() {
      this.availableLanguages = this.langService.availableLanguages;
      this.currentLanguage = this.langService.currentLanguage;
      this.langService.languageChanged.subscribe(
          (lang:string) => {
              console.log('new language set to ', lang);
              this.currentLanguage = lang;
          }
      );
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log("cu: ",this.userService.currentUser)
    this.loggedIn = this.userService.currentUser !== undefined;
  }


  register() {
    if (!this.emailValid || !this.passwordValid) {
      this.invalidForm = true;
    } else {
      this.signupWait = true;
      this.signupError= false;
      this.signupScreen = false;
      this.userService.create(this.model)
        .subscribe(
          data => {
            this.signupScreen = false;
            this.signupError  = false;
            this.signupWait   = false;
            //this.router.navigate(['/login']);
          },
          error => {
            if (typeof  error._body == 'string') {
              if (error._body.indexOf('taken') > -1) {
                this.signupScreen = true;
                // don't show signup error screen, show initial screen
                // with error messages
                this.signupError  = false;
                this.signupWait   = false;
                this.usernameExists = true;
              }
            }
            this.loading = false;
          });
    }
  }

  navigateToRedirect() {
    let redirectURL = this.redirect.getRedirect();
    this.redirect.resetRedirectURL();
    this.router.navigate([redirectURL ? redirectURL : '/'])
  }

  goBack() {
    this.signupScreen = true;
    this.signupError  = false;
    this.signupWait   = false;
  }

  emailValidator(email:string): boolean {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.usernameExists = false;
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
              console.log('facebook user:', fbUser);
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
              //this.userService.userActivated.next(true);
            });
        }
      }
    );
  }

  onFBLoginSuccess(user:User) {
    this.userService.loginType = 'facebook';
    this.userService.currentUser = user;
    console.log('localstorage 3');
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userService.userActivated.next(true);
  }

}
