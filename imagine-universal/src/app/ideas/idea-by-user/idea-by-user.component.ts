import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Idea} from "../../shared/idea.model";
import {User} from "../../shared/user.model";
import {IdeaService} from "../../services/ideas.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-idea-by-user',
  templateUrl: './idea-by-user.component.html',
  styleUrls: ['./idea-by-user.component.css']
})
export class IdeaByUserComponent implements OnInit {

  ideas:Idea[] = [];
  loading:boolean = true;
  userName:string;
  constructor(private ideasService:IdeaService,
              private userService:UserService,
              private changeDetector:ChangeDetectorRef,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

    let userId = this.activatedRoute.snapshot.params.id;
    this.ideasService.getIdeasByUser(userId)
      .subscribe(
        data  => {
          let ideas = JSON.parse(data['_body']).ideas;
          this.ideas = this.ideasService.parseIdeas(ideas);
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
    this.userService.getUsernameById(userId)
      .subscribe(
        data => {
          if (data.firstName || data.lastName) {
            this.userName = (data.firstName ? data.firstName : '') + (data.lastName ? ' '+data.lastName : '');
          } else {
            this.userName = 'Anonymous';
          }
          this.changeDetector.detectChanges();
        },
        error => {
        }
      );


  }

}
