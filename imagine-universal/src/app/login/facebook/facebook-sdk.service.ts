import { PLATFORM_ID, Inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { Observer, NextObserver } from 'rxjs/Observer';

import { FacebookAuthResponse } from './facebook-auth';
import { FbUser } from './fbuser.model';

import 'rxjs/add/operator/map';

declare const FB: any;

@Injectable()
export class FacebookSdkService  {
    fbLoginStatus = "";
    response: FacebookAuthResponse;
    fbUser: FbUser;
    shareObservable: Observable<string>;
    // private FB: any;
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
      try {
        if (isPlatformBrowser(this.platformId)) {
          FB.init({
            appId: '444142169287978',
            cookie: true,  // enable cookies to allow the server to access
            status: true,                    // the session
            xfbml: true,
            // parse social plugins on this page
            version: 'v2.8' // use graph api version 2.8
          });
        }
      } catch (e) {
      }
    }

    facebookLogin(): Observable<FacebookAuthResponse> {
        return Observable.create((observer: NextObserver<FacebookAuthResponse>) => {
          if (isPlatformBrowser(this.platformId)) {
            FB.login((response: FacebookAuthResponse) => {
              // add logic to store user in localstorage
              this.response = response;
              this.fbLoginStatus = response.status;
              observer.next(this.response);
              observer.complete();
            });
          } else {
            observer.error('Running on server');
          }
        });
    }

    facebookLogout(): Observable<FacebookAuthResponse> {
        return Observable.create((observer: NextObserver<FacebookAuthResponse>) => {

            FB.logout((response: FacebookAuthResponse) => {
                // add logic to store user in localstorage
                this.response = response;
                this.fbLoginStatus = response.status;
                observer.next(this.response);
                observer.complete();
            });
        });
    }

    getProfilePicture(id) :  Observable<FacebookAuthResponse> {
      return Observable.create((observer: NextObserver<FacebookAuthResponse>) => {
        FB.api(
          "/"+id+"/picture?type=large",
          function (response) {
            if (response && !response.error) {
              observer.next(response);
            } else {
              if (response.error) {
                observer.error(response.error);
              } else {
                observer.error('unknown error');
              }
            }
          }
        );
      });
    }

    loginStatus() : Observable<FacebookAuthResponse> {
        return Observable.create((observer: NextObserver<FacebookAuthResponse>) => {

            FB.getLoginStatus((response: FacebookAuthResponse) => {
                // add logic to store user in localstorage
                this.response = response;
                this.fbLoginStatus = response.status;
                observer.next(this.response);
                observer.complete();
            });
        });
    }

    me() : Observable<FbUser> {
        return Observable.create((observer: NextObserver<FbUser>) => {
          if (isPlatformBrowser(this.platformId)) {
            FB.api('/me?fields=id,first_name,last_name,email', (response: any) => {
              this.fbUser = response;
              observer.next(this.fbUser);
              observer.complete();
            });
          } else {
            observer.error('Running on server');
          }

        });
    }


    statusChangeCallback(resp: FacebookAuthResponse) {
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing
            // access token given by facebook
            status = resp.status;
            var uid = resp.authResponse.userID;
            var accessToken = resp.authResponse.accessToken;
        } else if (resp.status === 'not_authorized') {

        } else {

        }

        this.fbLoginStatus = resp.status;
    };

    share(url) {
      this.shareObservable = Observable.create((observer:Observer<string>) => {
        FB.ui({
          method: 'share',
          href: url,
        }, function(response){
          if (response.error_code) {
            observer.error(response.error_message as string);
          } else {
            observer.next('valid');
            observer.complete();
          }
        });
      })

    }
}


