import { Component, OnInit } from '@angular/core';
import {IdeaService} from "../../services/ideas.service";
import {Hashtag} from "../../shared/hashtag.model";
import {HashtagsService} from "../../services/hashtags.service";

@Component({
  selector: 'app-rebuild-tags',
  templateUrl: './rebuild-tags.component.html',
  styleUrls: ['./rebuild-tags.component.css']
})
export class RebuildTagsComponent implements OnInit {

  constructor(private ideaService: IdeaService,
              private hashtagService: HashtagsService) { }

  ngOnInit() {
  }

  onRefreshTags() {
    console.log('refresh tags call')
    this.ideaService.getTagsFromIdeas()
      .subscribe(
        data => {
          console.log('data -> ', data);
          const tags = data.json().ideas.reduce((res, curr) =>{
            console.log(curr.hashtags);
            res.concat(curr.hashtags)
          }, []);
          this.convertToHashtags(tags);
        },
        error => {console.log('error from get tags', error)}
      );
  }

  convertToHashtags(strList: string[]) {
    let res = [],
        temp = [];
    strList.forEach((t) => {
      temp[t] ? temp[t]++ : temp[t] = 1;
    });
    for( let htag in temp) {
      res.push(new Hashtag(htag, temp[htag]));
    }
    console.log(res);
    this.hashtagService.resetTags(res)
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

}
