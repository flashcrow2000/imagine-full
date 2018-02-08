import {Component, Input, OnInit} from '@angular/core';
import {Notification} from "../../shared/notification.model";
import {UserService} from "../../services/user.service";
import {IdeaService} from "../../services/ideas.service";
import {Idea} from "../../shared/idea.model";

@Component({
  selector: 'app-single-notification',
  templateUrl: './single-notification.component.html',
  styleUrls: ['./single-notification.component.css']
})
export class SingleNotificationComponent implements OnInit {
  @Input() notification:Notification;
  userInfo:any;
  userName: string;
  idea:Idea;
  readMoreLinkVisible:boolean = false;
  readMoreLink:string;
  maxDescriptionLength = 270;

  totalFollowers:number;
  totalShares:number;
  imageURL:string;
  ideaDescription: string;
  ideaTitle: string;


  constructor(private userService:UserService,
              private ideaService:IdeaService) { }

  ngOnInit() {
    /*
    by_user_id: "59db5afe718c5b000f3e1780" (follower)
    for_user_id: "59db2e98718c5b000f3e1775" (idea owner)
    read: false
    target_id: "59db397e718c5b000f3e1777" (idea id)
    type: "followers"
     */

    this.userService.getUsernameById(this.notification.by_user_id)
      .subscribe(
        data => {
          this.userInfo = data;
          if (data.firstName || data.lastName) {
            this.userName = (data.firstName ? data.firstName : '') + (data.lastName ? ' '+data.lastName : '');
          } else {
            this.userName = 'Anonymous';
          }
        },
        error => {
        }
      );
    this.ideaService.getIdeaById(this.notification.target_id)
      .subscribe(
        data => {
          this.idea = new Idea();
          this.idea.parse(JSON.parse(data['_body'])[0]);
          this.totalFollowers = this.idea.followers ? this.idea.followers.length : 0;
          this.totalShares = this.idea.shares ? this.idea.shares : 0;
          this.ideaTitle= this.idea.title;
          this.imageURL = this.idea.imgType ?
            this.compileImageData(this.idea.imgType, this.idea.imgBuffer) : this.idea.imgURL;
          if (this.idea.description.length > this.maxDescriptionLength) {
            this.ideaDescription = this.idea.description.substr(0, this.maxDescriptionLength)+'...';
            this.readMoreLink = '/ideas/'+this.idea._id;
            this.readMoreLinkVisible = true;
          } else {
            this.ideaDescription = this.idea.description
          }
        },
        error => {
        }
      )

  }

  compileImageData(type, data):string {
    let result = "data:" + type + ";base64," + data;
    return result;
  }

}
