import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {IdeaService} from "../../services/ideas.service";
import {UserService} from "../../services/user.service";
import {Idea} from "../../shared/idea.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  ideasCount:number;
  usersCount:number;
  ideas: Idea[];
  ideasLoaded:boolean = false;
  userLoggedIn:boolean;
  tempSub:Subscription;
  constructor(private userService:UserService,
              private ref: ChangeDetectorRef,
              private ideaService:IdeaService) { }

  ngOnInit() {
    this.tempSub = this.userService.userActivated.subscribe(
      (loggedIn: boolean) =>
      {
        this.userLoggedIn = loggedIn;
        this.ref.detectChanges();
      }
    )
    this.userLoggedIn = (this.userService.currentUser !== undefined &&
      this.userService.loginType != '');

    this.ideaService.getIdeasCount().subscribe(
      data => {this.ideasCount = JSON.parse(data['_body'])['count']},
      error => {console.log('error after count:', error)}
    );

  this.userService.getUsersCount().subscribe(
    data => {this.usersCount = JSON.parse(data['_body'])['count']},
    error => {console.log('error after user count:', error)}
  );

  this.ideaService.getLatestIdeas('popular', 4) // value will be 'last' or 'popular'
    .subscribe(
      data => {
        let ideas = JSON.parse(data['_body']).ideas;
        console.log('ideas', ideas);
        this.ideas = this.ideaService.parseIdeas(ideas);
        this.ref.detectChanges();
        this.ideasLoaded = true;
      },
      error => { console.log(error)}
    );
  }

  ngOnDestroy() {
    this.tempSub.unsubscribe();
    this.ref.detach();
  }

}
