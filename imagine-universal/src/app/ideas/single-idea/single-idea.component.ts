import {Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { Idea } from '../../shared/idea.model';
import { User } from '../../shared/user.model';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {AppConfig} from "../../app.config";
import {RedirectService} from "../../services/redirect.service";
import {FacebookSdkService} from "../../login/facebook/facebook-sdk.service";
import {IdeaService} from "../../services/ideas.service";

@Component({
  selector: 'app-single-idea',
  templateUrl: './single-idea.component.html',
  styleUrls: ['./single-idea.component.css']
})
export class SingleIdeaComponent implements OnInit, AfterViewInit {
  @Input() idea: Idea;
  @Input() disableActions:boolean = false;
  currentUser: User;
  ownIdea:boolean = false;
  joinedIdea:boolean = false;
  maxDescription:number = 235;
  ideaDescription:string = '';
  ideaTruncated:boolean = false;
  showMoreLink:string = '';
  imageURL: string = '';
  @ViewChild('el')
    target: ElementRef;
  defaultImgURL = 'assets/images/ciudad.png';
  constructor(private userService: UserService,
              private config: AppConfig,
              private redirectService:RedirectService,
              private ideaService:IdeaService,
              private fbSDK:FacebookSdkService,
              private router: Router) { }

  ngOnInit() {
    if (this.userService.currentUser) {
      this.currentUser = this.userService.getCurrentUser();
      if (this.idea.user_id == this.currentUser._id) {
        this.ownIdea = true;
      }
      if (this.idea.followers.indexOf(this.currentUser._id) > -1) {
        this.joinedIdea = true;
      }
    }
    if (this.idea.description.length > this.maxDescription) {
      //this.ideaDescription = this.idea.description.substr(0, this.maxDescription)+'...';
      this.ideaTruncated = true;
    }
    // TODO move this to a service
    this.imageURL = this.idea.imgType ?
      this.compileImageData(this.idea.imgType, this.idea.imgBuffer) :
      (this.idea.imgURL ? this.idea.imgURL : this.defaultImgURL);
  }

  ngAfterViewInit() {
    let s = document.createElement("script");
    s.type = "text/javascript";
    s.src = 'assets/js/scripts.js';
    this.target.nativeElement.appendChild(s);
  }

  follow() {
    if (this.userService.currentUser) {
      this.userService.addJoinedIdea(this.idea._id);
      this.joinedIdea = true;
    } else {
      this.router.navigate(['/login']);
      this.redirectService.saveRedirect('/ideas/'+this.idea._id);
    }
  }
  // TODO move this to a service
  compileImageData(type, data):string {
    let result = "data:" + type + ";base64," + data;
    return result;
  }

  onImgClick() {
    if (!this.disableActions) {
      this.router.navigate(['/ideas/' + this.idea._id]);
    }
  }

  share() {
    let url = this.config.pageUrl+'/ideas/'+this.idea._id;
    this.fbSDK.share(url);
    this.fbSDK.shareObservable.subscribe(
      (data) => {
        this.ideaService.updateShares(this.idea._id)
          .subscribe(
            d => {
            },
            e => {
            }
          );
      }, // end data
      (error) => {
      },// end error
      () => {
      }
    );
  }
}
