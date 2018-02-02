// return own ideas
// return featured ides
// return followed ideas
// create new idea
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfig } from '../app.config';
import { Idea } from '../shared/idea.model'
import { JwtService } from './jwt.service';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class IdeaService {

  refreshIdeas = new Subject();
  refreshNewIdea = new Subject();
  ideaForEdit: Idea = null;

  constructor(private http: Http,
              private config: AppConfig,
              private jwt: JwtService) {}

  saveIdea(idea:Idea) {
    console.log('posting idea to server:', idea);
    console.log('post to:', (this.config.apiUrl+'/ideas/new'));
    return this.http.post(this.config.apiUrl+'/ideas/new', idea, this.jwt.getJWT());
  }

  getIdeasByUser(userId:string):Observable<any> {
    console.log('get ideas by ', userId);
    return this.http.post(this.config.apiUrl+'/ideas/fromUser', {id:userId}, this.jwt.getJWT());
  }

  /*
  to be removed
   */

  getTagsFromIdeas(): Observable<any> {
    console.log('get tags');
    return this.http.get(this.config.apiUrl + '/ideas/hashtags');
  }

  getLatestIdeas(sortBy:string, count:number=20) {
    return this.http.post(this.config.apiUrl+'/ideas/latest', {sort:sortBy, count:count}, this.jwt.getJWT());
  }

  refreshIdeaComponent() {
    this.refreshIdeas.next(true);
  }

  refreshNewIdeaComponent() {
    this.refreshNewIdea.next(true);
  }

  uploadImage(formData) {
    // profilePic -> same name used in multer
    return this.http.post(this.config.apiUrl+'/ideas/upload', formData, this.jwt.getJWT());
  }

  searchIdeas(q) {
    return this.http.post(this.config.apiUrl+'/ideas/search', {query:q}, this.jwt.getJWT());
  }

  parseIdeas(ideas) : Idea[] {
    var result:Idea[] = [];
    for (let k:number=0; k<ideas.length; k++) {
      var temp = new Idea();
      temp.parse(ideas[k]);
      result.push(temp);
    }

    return result;
  }

  updateShares(ideaId) {
    return this.http.post(this.config.apiUrl+'/ideas/addShare', {idea:ideaId}, this.jwt.getJWT());
  }

  updateIdea(tIdea:Idea) {
    return this.http.put(this.config.apiUrl + '/ideas/' + tIdea._id, tIdea, this.jwt.getJWT());
  }

  deleteIdea(id:string) {
    console.log('delete with id:', id);
    return this.http.post(this.config.apiUrl+'/ideas/delete', {_id:id}, this.jwt.getJWT());
  }

  addFollowerToIdea(ideaId, userId) {
    return this.http.post(this.config.apiUrl+'/ideas/addFollower', {idea:ideaId, user:userId}, this.jwt.getJWT());
  }

  getIdeaById(id:string) {
    return this.http.post(this.config.apiUrl+'/ideas/byId', {id:id}, this.jwt.getJWT());
  }

  convertDbItemToIdea(data:any, override:boolean = false):Idea {
    let tIdea:Idea = new Idea;
    for (var k in data) {
      if (!tIdea[k] || override) {
        tIdea[k] = data[k];
      } else {
        //console.log('typeof k:', typeof tIdea[k]);
      }
    }
    console.log('after convert:', tIdea)
    return tIdea;
  }

  findFollowed(id) {
    return this.http.post(this.config.apiUrl+'/ideas/followed', {id:id}, this.jwt.getJWT());
  }

  getIdeasCount() {
    return this.http.post(this.config.apiUrl+'/ideas/count', {}, this.jwt.getJWT());
  }
}
