import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../shared/user.model";
import {NotificationsService} from "../../services/notifications.service";
import {IdeaService} from "../../services/ideas.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {



  // form autocompleted data
  firstName: string;
  lastName:string;
  email:string;
  fb:string;
  twit:string;
  insta:string;
  web:string;
  ////

  currentUser:User;
  notificationsCount: number = 0;
  username: string;
  defaultImgURL:string = '/assets/images/default-profile-pic.png';
  imgURL:string = '';
  ideaCount: number= 0;
  userLocation: string = '';


  constructor(private userService:UserService,
              private ref:ChangeDetectorRef,
              private notif:NotificationsService,
              private ideaService: IdeaService) { }

  ngOnInit() {

  }

  emailValidator(email:string): boolean {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!EMAIL_REGEXP.test(email)) {
      return false;
    }
    return true;
  }

  compileImageData(type, data):string {
    //console.log('compile image data from ', type, data.length);
    let result = "data:" + type + ";base64," + data;
    return result;
  }

  getUsername() : string {
    let result = '';
    if (this.currentUser) {
      if (this.userService.checkUsernameHasOnlyNumber()) {
        if (this.currentUser.fb_user_id) {
          // show FB first name + last name
          result = this.currentUser.fb_first_name+' '+this.currentUser.fb_last_name;
        } else {
          if (this.currentUser.g_user_id) {
            // show Google first name + last name
            result = this.currentUser.g_first_name+' '+this.currentUser.g_last_name;
          }
        }
      } else {
        // classic account; show username
        result = this.currentUser.username !== '' ? this.currentUser.username : this.currentUser.email;
      }
    }
    return result;
  }



}
