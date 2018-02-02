import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IdeaService} from "../../services/ideas.service";
import {UserService} from "../../services/user.service";
import {User} from "../../shared/user.model";
import {Idea} from "../../shared/idea.model";

@Component({
  selector: 'app-joined',
  templateUrl: './joined.component.html',
  styleUrls: ['./joined.component.css']
})
export class JoinedComponent implements OnInit {

  currentUser:User;
  ideas: Idea[];
  loading:boolean = true;
  constructor(private ideasService:IdeaService,
              private userService:UserService,
              private changeDetector:ChangeDetectorRef) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.ideasService.findFollowed(this.currentUser._id)
      .subscribe(
        data => {
          let ideas = JSON.parse(data['_body']);

          //console.log('ideas', ideas);
          this.ideas = this.ideasService.parseIdeas(ideas);
          this.loading = false;
          this.changeDetector.detectChanges();
          },
        error => {console.log('error after find followed', error)}
      )
  }

}
