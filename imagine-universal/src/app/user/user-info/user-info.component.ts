import {Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {FacebookSdkService} from "../../login/facebook/facebook-sdk.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @ViewChild('file') el:ElementRef;
  currentUser:User;
  imageData:string;
  hasEmail:boolean;
  fbImageLink:string = null;
  uploadForm: FormGroup = new FormGroup({
      'picture' : new FormControl(),
      'description': new FormControl()
    });

  constructor(private userService:UserService,
              private ref: ChangeDetectorRef,
              private fbSDK:FacebookSdkService) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
    this.hasEmail = (this.currentUser.email !== undefined);
    this.imageData = this.compileImageData(this.currentUser.imgType, this.currentUser.imgBuffer);
    if (this.fbImageLink == null && this.currentUser.fb_user_id) {
      this.getFacebookImage();
    }

  }

  compileImageData(type, data):string {
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
        result = this.currentUser.username;
      }
    }
    return result;
  }

  getEmail(): string {
    return this.currentUser.email!== undefined ? this.currentUser.email : 'No e-mail address provided';
  }

  isFacebookLinked():boolean {
    let res = false;
    if (this.currentUser) {
      if (this.currentUser.fb_user_id) {
        res = true;
      }
    }

    return res;
  }

  getFacebookImage() {
    this.fbImageLink = undefined;
    if (this.currentUser.fb_user_id) {
      this.fbSDK.getProfilePicture(this.currentUser.fb_user_id).subscribe(
        data => {
          this.fbImageLink = data['data'].url;

        },
        error => {
        }
      )
    }
  }

  onChange() {
  }

  onSubmit() {
    let fd:FormData = new FormData();
    fd.append('photo', this.el.nativeElement.files.item(0));
    // insert user id OR username
    fd.append('username', this.userService.currentUser.username);
    this.userService.uploadImage(fd)
        .subscribe(
          data  => {

            let t = JSON.parse(data['_body'])['value'];
            this.userService.updateImageData(t.imgType, t.imgBuffer);
            setTimeout(() => {
              this.imageData = this.compileImageData(t.imgType, t.imgBuffer);
              this.ref.detectChanges();
            }, 100)

          },
          error => {console.log(error)});
  }

  isGoogleLinked(): boolean {
    let res = false;
    if (this.currentUser) {
      if (this.currentUser.g_user_id) {
        res = true;
      }
    }
    return res;
  }

}
