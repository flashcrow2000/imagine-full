import {PLATFORM_ID, Inject, Injectable} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';

import { AppConfig } from '../app.config';

import { Subject } from 'rxjs/Subject';

import { FacebookSdkService } from '../login/facebook/facebook-sdk.service';
import { FacebookAuthResponse } from '../login/facebook/facebook-auth';

import { FbUser } from '../login/facebook/fbuser.model';
import { User } from '../shared/user.model';
import {JwtService} from "./jwt.service";
import {NotificationsService} from "./notifications.service";
import {IdeaService} from "./ideas.service";

@Injectable()
export class UserService {
    userActivated = new Subject();
    userInfoChanged = new Subject();
    googleAccountLogout = new Subject();
    loginType = ''; // 'facebook' | 'classic'
    currentUser:User = undefined;
    fbAuth:FacebookAuthResponse;
    tempBuffer:string;

    constructor(@Inject(PLATFORM_ID) private platformId: Object,
                private http: Http,
                private config: AppConfig,
                private router: Router,
                private jwt: JwtService,
                private notifService: NotificationsService,
                private ideaService: IdeaService,
                private fbSDK: FacebookSdkService) {
      this.getCurrentUser();
    }

    getAll() {
        return this.http.get(this.config.apiUrl + '/users', this.jwt.getJWT()).map((response: Response) => response.json());
    }

    getUsernameById(_id: string) {
        return this.http.post(this.config.apiUrl + '/users/username', {id:_id}, this.jwt.getJWT()).map((response: Response) => response.json());
    }

    create(user: User) {
        //return this.http.post(this.config.apiUrl + '/register', user, this.jwt());
        return this.http.post(this.config.apiUrl + '/users/register', user, this.jwt.getJWT());
    }

    update(user: User) {
        let tempUser:User = user;
        if (tempUser.imgBuffer) {
          this.tempBuffer = tempUser.imgBuffer;
          tempUser.imgBuffer = null;
        }
        return this.http.put(this.config.apiUrl + '/users/' + tempUser._id, tempUser, this.jwt.getJWT());
    }

    delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/users/' + _id, this.jwt.getJWT());
    }

    logout() {
      localStorage.clear();
        switch (this.loginType) {
            case 'facebook':
                this.fbSDK.facebookLogout().subscribe(
                      fbAuth => {
                      }
                )
                break;
            case 'google':
                // logout from the google component
                this.googleAccountLogout.next(true);
                break
            case 'classic':

                break;

        }
      //localStorage.setItem('currentUser', '{}');
      //localStorage.removeItem('currentUser');
      //localStorage.clear();
      this.currentUser = undefined;
      this.loginType = '';
      this.userActivated.next(false);


    }

    uploadImage(formData) {
        // profilePic -> same nme used in multer
        return this.http.post(this.config.apiUrl+'/users/upload', formData, this.jwt.getJWT());
    }

    forgotPassword(val) {
      return this.http.post(this.config.apiUrl+'/users/forgot', {email:val});
    }

    resetPassword(resetId, pass) {
      return this.http.post(this.config.apiUrl+'/users/reset', {resetId:resetId, pass:pass});
    }

    getCurrentUser() {
      if (!isPlatformBrowser(this.platformId)) {
        return null;
      }
      let ls = (localStorage.getItem('currentUser'));
      if (ls && !this.currentUser) {
        this.currentUser = this.convertDBUserToImagine(JSON.parse(ls), true);
        this.loginType = this.currentUser.fb_user_id ? 'facebook' : 'classic';
      }
      return this.currentUser;
    }

    checkUsernameHasOnlyNumber() : boolean{
        if (this.currentUser) {
            return /^\d+$/.test(this.currentUser.username);
        }
        return false;
    }

    convertToImagineUser(user:any):User {
        let tUser:User = new User();
        switch (user.type) {
            case "facebook":
                let fbUser = user;
                tUser.username = tUser.fb_user_id = user.id;
                tUser.fb_first_name = (user as FbUser).first_name;
                tUser.fb_last_name = (user as FbUser).last_name;

                break;
            case "google":
                // code...
                break;
        }

        return tUser;

    }

    clearNotifications() {
      if (this.currentUser) {

      }
    }

    addJoinedIdea(id:string) {
      if (this.currentUser) {
        if (!this.currentUser.following) {
          this.currentUser.following = [];
        }
        if (this.currentUser.following.length == 0 ||
            (this.currentUser.following.length > 0 && (this.currentUser.following.indexOf(id) == -1))) {
          this.currentUser.following.push(id);
          this.update(this.currentUser).subscribe(
            data => {
              this.updateLocalUser(this.currentUser);
              this.notifService.addNotification(id, this.currentUser._id ).subscribe(
              );
              this.ideaService.addFollowerToIdea(id, this.currentUser._id).subscribe(
              )
            }
          );

        }
      }
    }

    convertDBUserToImagine(data:any, override:boolean = false):User {
      let tUser:User = new User();

      for (var k in data) {
        if (!tUser[k] || override) {
          tUser[k] = data[k];
        } else {
        }
      }

      return tUser;
    }
 /*   updateUser(user) {
        if (!this.currentUser) {
            this.currentUser = new User()
        }
        for (let k in user) {
            this.currentUser[k] = user[k];
        }
    }
*/
    updateUserLocation(lat:number, long:number, label:string) {
        if (this.currentUser !== undefined) {
            this.currentUser.location_label = label;
            this.currentUser.location_lat = ''+lat;
            this.currentUser.location_long = ''+long;
            this.update(this.currentUser)
                .subscribe(
                data => {
                    //this.userInfoChanged.next(this.currentUser)
                    this.updateLocalUser(this.currentUser);
                    this.router.navigate(['/profile']);
                },
                error => {
                });
        }
    }

    updateLocalUser(user:User) {
      this.currentUser = user;
      if (!this.currentUser.imgBuffer) {
        this.currentUser.imgBuffer = this.tempBuffer;
      }
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.userInfoChanged.next(this.currentUser);
    }

    getUsersCount() {
      return this.http.post(this.config.apiUrl+'/users/count',
                            {}, this.jwt.getJWT());
    }

    updateImageData(imgType, imgData) {
      this.currentUser.imgType = imgType;
      this.currentUser.imgBuffer = imgData;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
}
