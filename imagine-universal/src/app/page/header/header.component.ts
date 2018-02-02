import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { UserService } from '../../services/user.service'
import { AuthenticationService } from '../../login/classic/authentication.service'
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../shared/user.model";
import {NotificationsService} from "../../services/notifications.service";
import {IdeaService} from "../../services/ideas.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('file') el:ElementRef;
  editForm: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    facebook: new FormControl(),
    instagram: new FormControl(),
    twitter: new FormControl(),
    web: new FormControl()
  });
  dropDownCloseable:boolean = false;
  ownIdeasLink:string;
  dropdownvisible:boolean = false;
  userLoggedIn = false;
  currentUser:User;
  firstName:string;
  lastName:string;
  username:string;
  email:string;
  invalidEmail = false;
  fb:string;
  twit:string;
  insta:string;
  web:string;
  imgURL:string;
  userLocation:string;
  defaultImgURL:string = '/assets/images/default-profile-pic.png';
  notificationsCount:number;
  ideaCount:number;


  constructor(private userService:UserService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private notif:NotificationsService,
              private ideaService:IdeaService,
              private ref:ChangeDetectorRef,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.userService.userActivated.subscribe(
      (loggedIn: boolean) =>
      {
        this.userLoggedIn = loggedIn;
        console.log('logged in?', this.userLoggedIn);
        if (this.userLoggedIn) {
          this.populateUserData();
        }
        this.ref.detectChanges();
      }
    );
    this.userService.userInfoChanged.subscribe(
      (user:User) => {
        // if (user.location_label) {
        //   this.userLocation = (user.location_label &&
        //     user.location_label.indexOf(',')>-1) ?
        //     user.location_label.split(',')[0]+'...' : '';
        // }
        this.populateUserData();
      }
    )
    this.userService.getCurrentUser();
    console.log('got current user:', this.userService.currentUser);
    this.userLoggedIn = (this.userService.currentUser !== undefined &&
                         this.userService.loginType != '');
    if (this.userLoggedIn) {
      this.populateUserData();
    }
  }

  onClickOutside() {
    if (this.dropDownCloseable) {
      this.onMenuClick();
    }
  }

  onNewIdeaClicked() {
    if (this.activatedRoute['_routerState'].snapshot.url == '/new-idea') {
      this.ideaService.refreshNewIdeaComponent();
      //this.router.navigateByUrl('/ideas');
    } else {
      this.router.navigate(['/new-idea']);
    }
    this.onMenuClick();

  }

  onIdeasClicked() {
    if (this.activatedRoute['_routerState'].snapshot.url == '/ideas') {
      this.ideaService.refreshIdeaComponent();
      //this.router.navigateByUrl('/ideas');
    } else {
      this.router.navigate(['/ideas']);
    }
    this.onMenuClick();

  }

  populateUserData(ignoreImage:boolean = false) {
    this.currentUser = this.userService.getCurrentUser();
    this.ownIdeasLink = '/ideasBy/'+this.currentUser._id;
    this.firstName = this.currentUser.fb_first_name || "";
    this.lastName= this.currentUser.fb_last_name || "";
    this.username = this.firstName+' '+this.lastName;
    if (this.username.length == 1) {
      this.username = "Name not set";
    }
    this.email = this.currentUser.email ||
      (this.emailValidator(this.currentUser.username) ? this.currentUser.username : "");
    this.fb = this.currentUser.fbAccountName || "";
    this.twit = this.currentUser.twitterAccountName || "";
    this.insta = this.currentUser.instagramAccountName || "";
    this.web = this.currentUser.webpage || "";
    if (!ignoreImage) {
      this.imgURL = this.currentUser.imgType ?
        this.compileImageData(this.currentUser.imgType, this.currentUser.imgBuffer) :
        (this.currentUser.imgURL ? this.currentUser.imgURL : this.defaultImgURL);
    }
    this.userLocation = (this.currentUser.location_label) ?
      this.currentUser.location_label.split(',')[0]+'...' :
      '';
    // if (this.notif.notificationsAvailable) {
    //   this.notificationsCount = this.notif.notificationsList.length;
    // } else {
    this.notif.getNotificationsForUser(this.currentUser._id, 'count').subscribe(
      data => {
        let result:any = JSON.parse(data['_body']);
        this.notificationsCount = result.notifications;
        this.notif.notificationsUpdate.subscribe(
          (data) => {
            console.log('notificationsUpdate:',data);
            this.notificationsCount = 0;
          });
        this.ref.detectChanges();
      },
      error => {
      }
    );
    //}
    this.ideaService.getIdeasByUser(this.currentUser._id)
      .subscribe(
        data => {
          let tempData = JSON.parse(data['_body']);
          this.ideaCount = tempData.ideas.length;
          this.ref.detectChanges();
        },
        error => {
        }
      )
    this.ref.detectChanges();
  }

  emailValidator(email:string): boolean {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!EMAIL_REGEXP.test(email)) {
      return false;
    }
    return true;
  }

  compileImageData(type, data):string {
    let result = "data:" + type + ";base64," + data;
    return result;
  }

  onMenuClick() {
    if (this.dropDownCloseable) {
      this.dropdownvisible = false;
      this.ref.detectChanges();
      this.dropDownCloseable = false;
    }
  }

  dropdownAction() {
    this.dropdownvisible = !this.dropdownvisible;
    this.ref.detectChanges();
    // fix a race condition for clickOutside
    if (this.dropDownCloseable) {
      this.dropDownCloseable = false;
    } else {
      setTimeout(() => this.dropDownCloseable = true, 100);
    }
  }

  checkEmail() {
    this.invalidEmail = false;
    let formEmail = this.editForm.get('email').value || this.email;
    if (formEmail) {
      if (this.emailValidator(formEmail)) {
      } else {
        this.invalidEmail = true;
      }
    } else {
      this.invalidEmail = true;
    }
  }

  onEdit() {
    //handle form
    this.checkEmail();

    if (this.invalidEmail) {
      return;
    }

    let formFirstName = this.editForm.get('firstName').value;
    if (formFirstName) {
      this.currentUser.fb_first_name = formFirstName;
    }

    let formLastName = this.editForm.get('lastName').value;
    if (formLastName) {
      this.currentUser.fb_last_name = formLastName;
    }

    let formFacebook = this.editForm.get('facebook').value;
    if (formFacebook) {
      this.currentUser.fbAccountName = formFacebook;
    }

    let formTwitter = this.editForm.get('twitter').value;
    if (formTwitter) {
      this.currentUser.twitterAccountName = formTwitter;
    }

    let formInstagram = this.editForm.get('instagram').value;
    if (formInstagram) {
      this.currentUser.instagramAccountName = formInstagram;
    }

    let formWeb = this.editForm.get('web').value;
    if (formWeb) {
      this.currentUser.webpage = formWeb;
    }
    this.userService.update(this.currentUser)
      .subscribe(
        data => {
          this.userService.updateLocalUser(this.currentUser);
          this.populateUserData(true);
        },
        error => {
        }
      );
    // handle image
    let fd:FormData = new FormData();
    if (this.el.nativeElement.files.length > 0) {
      fd.append('photo', this.el.nativeElement.files.item(0));
      // insert user id OR username
      fd.append('username', this.userService.currentUser.username);
      this.userService.uploadImage(fd)
        .subscribe(
          data => {

            let t = JSON.parse(data['_body']);
            this.userService.updateImageData(t.imgType, t.imgBuffer);
            setTimeout(() => {
              this.imgURL = this.compileImageData(t.imgType, t.imgBuffer);
              this.ref.detectChanges();
            }, 100)

          },
          error => {
          });
    }
  }

  onLogout() {
    this.onMenuClick();
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
