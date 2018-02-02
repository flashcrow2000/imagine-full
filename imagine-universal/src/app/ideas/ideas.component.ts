import {
  AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit,
  ViewChild
} from '@angular/core';
import { Idea } from '../shared/idea.model';
import {IdeaService} from '../services/ideas.service';
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent implements OnInit, AfterViewInit{
  loading: boolean = true;
  searchTerm:any = '';
  allIdeas: Idea[] = [];
  ideas : Idea[] = [];
  @ViewChild('el')
    target: ElementRef;
/*    new Idea('mark', 'Share my records collection', 12, 'Enjoy music'),
    new Idea('sherryl', 'Teach kids about sport', 17, 'Healthy life'),
    new Idea('tudor', 'Teach others to cook', 9, 'Good food, good life')
  ]*/
  constructor(private ideasService: IdeaService,
              private route: ActivatedRoute,
              private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.ideasService.getLatestIdeas(this.route.snapshot.queryParams['q'], 100) // value will be 'last' or 'popular'
      .subscribe(
        data => {
          let ideas = JSON.parse(data['_body']).ideas;
          //console.log('ideas', ideas);
          this.allIdeas = this.ideas = this.ideasService.parseIdeas(ideas);
          this.loading = false;
          this.ref.detectChanges();
          this.addScripts();
          // show the original ideas again
        },
        error => { console.log(error)}
      );
    this.ideasService.refreshIdeas.subscribe(
      (val:boolean) => {
        this.ideas = this.allIdeas;
        this.ref.detectChanges();
      }
    )
  }

  ngAfterViewInit() {
  }

  onKey(ev) {
    if (ev.code == "Enter") {
      this.onSearch();
    }
  }

  addScripts() {
    let s = document.createElement("script");
    s.type = "text/javascript";
    s.src = 'assets/js/scripts.js';
    setTimeout(() => {
      this.target.nativeElement.appendChild(s);
    }, 100)
  }

  onSearch() {
    this.ideasService.searchIdeas(this.searchTerm)
      .subscribe(
        data => {
          let ideas = JSON.parse(data['_body']).ideas;
          this.ideas = this.ideasService.parseIdeas(ideas);
          this.loading = false;
          this.ref.detectChanges();
        },
            error => console.log('error after count:', error)
      )
  }

}
