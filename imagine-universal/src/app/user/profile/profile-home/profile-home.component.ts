import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IdeaService} from "../../../services/ideas.service";
import {Idea} from "../../../shared/idea.model";
import {UserService} from "../../../services/user.service";
import {User} from "../../../shared/user.model";

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css']
})
export class ProfileHomeComponent implements OnInit {

  showMoreIdeasVisible = false;
  @ViewChild('email')
    email:ElementRef;
  ideas: Idea[] = [];
  myIdeasURL: string;
  requestEmail = true;
  emailValid = true;
  ideasLoaded:boolean = false;
  currentUser:User;
  constructor(private ideaService:IdeaService,
              private userService:UserService,
              private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.myIdeasURL = '/ideasBy/'+this.currentUser._id;
    if (!this.currentUser.email) {
      console.log('no email')
      if (this.emailValidator(this.currentUser.username)) {
        console.log('username is email')
        this.currentUser.email = this.currentUser.username;
        this.requestEmail = false;
        this.userService.update(this.currentUser);
      } else {
        this.requestEmail = true;
      }
    } else {
      this.requestEmail = false;
    }
    this.ideaService.getIdeasByUser(this.userService.currentUser._id)
      .subscribe(
        data => {
          let ideas = JSON.parse(data['_body']).ideas;
          let temp:Idea[] = this.ideaService.parseIdeas(ideas);
          if (temp.length > 0) {
            this.ideas = temp.sort((i1: Idea, i2: Idea) => {
              //console.log(i2.followersTotal, '-', i2.followersTotal);
              return i2.followersTotal - i1.followersTotal
            });
          }
          console.log('ideas', this.ideas);
          if (this.ideas.length > 4) {
            this.showMoreIdeasVisible = true;
          }
          this.ref.detectChanges();
          this.ideasLoaded = true;
        },
        error => { console.log(error)}
      );
  }

  onEmailAdded() {
    if (!this.emailValidator(this.email.nativeElement.value)) {
      this.emailValid = false;
    } else {
      this.currentUser.email = this.email.nativeElement.value;
      this.userService.update(this.currentUser).subscribe(
        data => {
          this.userService.updateLocalUser(this.currentUser);
        },
        error => {

        }
      )
      this.requestEmail = false;
    }
  }

  // TODO move this to a utils class
  emailValidator(email:string): boolean {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!EMAIL_REGEXP.test(email)) {
      return false;
    }
    return true;
  }

}
