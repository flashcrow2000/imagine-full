import {Http} from "@angular/http";
import {AppConfig} from "../app.config";
import {JwtService} from "./jwt.service";
import {Hashtag} from "../shared/hashtag.model";
import {Injectable} from "@angular/core";

@Injectable()
export class HashtagsService {

  hashtags:Hashtag[];
  hashtagsList:string[];

  constructor(private http: Http,
              private config: AppConfig,
              private jwt: JwtService) {}

  getHashtags() {
    return this.http.post(this.config.apiUrl+'/tags/all', {}, this.jwt.getJWT());
  }

  updateHashtag(ht: Hashtag) {
    // let index:number = this.hashtags.indexOf(ht);
    // let exists:boolean = false;
    // if (index > -1) {
    //   exists = true;
    //   this.hashtags[index].uses++;
    // }
    //
    // if (exists) {
      return this.http.post(this.config.apiUrl+'/tags/update', {tag: ht}, this.jwt.getJWT());
    // } else {
    //   return this.http.post(this.config.apiUrl+'/tags/add', ht, this.jwt.getJWT());
    // }
  }

  removeHashtag(ht:Hashtag) {

  }

  parseTags(tags) : Hashtag[] {
    var result:Hashtag[] = [];
    for (let k:number=0; k<tags.length; k++) {
      var temp = new Hashtag();
      temp.parse(tags[k]);
      result.push(temp);
    }

    return result;
  }

  resetTags(tags: Hashtag[]) {
    console.log('call rest tags');
    return this.http.post(this.config.apiUrl+'/tags/reset', {tags:tags});
  }
}
