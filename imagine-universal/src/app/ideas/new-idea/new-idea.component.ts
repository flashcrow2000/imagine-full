import {
  ChangeDetectorRef, Component, ElementRef, Inject, Injectable, OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IdeaService } from '../../services/ideas.service';
import { User } from '../../shared/user.model';
import { Idea } from '../../shared/idea.model';
import {DOCUMENT} from "@angular/platform-browser";
import {HashtagsService} from "../../services/hashtags.service";
import {Hashtag} from "../../shared/hashtag.model";
import {Router} from "@angular/router";
import {LanguagesService} from "../../services/languages.service";


@Component({
  selector: 'app-new-idea',
  templateUrl: './new-idea.component.html',
  styleUrls: ['./new-idea.component.css']
})
@Injectable()
export class NewIdeaComponent implements OnInit, OnDestroy {
  newIdeaForm: FormGroup = new FormGroup({
    'title': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required),
    //'hashtags': new FormControl(''),
    'typeSelect': new FormControl('', Validators.required)
    });
  @ViewChild('file') fileUploadEl:ElementRef;
  @ViewChild('addBtn') addBtnRef:ElementRef;
  @ViewChild('username') username:ElementRef;
  //@ViewChild('tags') tags:ElementRef;
  ideaTypes = [
    {id:0, text:'No religion'},
    {id:1, text:'No countries'},
    {id:2, text:'No possessions'}
  ]

  addingIdea:boolean = false;
  ideaAdded:boolean = false;
  ideaURL:string = '';

  img1Selected: boolean = false;
  img2Selected: boolean = false;
  img3Selected: boolean = false;
  imageNeeded: boolean = false;
  hashtagsList: string[];
  showTagsInput = false;
  noType:boolean = false;
  loading = false;
  currentUser:User;
  defaultImages = {
                    'img1':'assets/images/slider_countries_imagine.jpg',
                    'img2':'assets/images/slider_religion_imagine.jpg',
                    'img3':'assets/images/slider_possessions_imagine.jpg'
                  }

  ideaHashtags:any= [];
  updateIdea:boolean = false;
  requestUsername:boolean = false;
    availableLanguages:Object = {};
    currentLanguage: string = '';
  refreshInterval:any;
  editIdea:Idea = null;
  constructor(@Inject(DOCUMENT) private document:any,
              private userService:UserService,
              private langService: LanguagesService,
              private router: Router,
              private ref:ChangeDetectorRef,
              private tagsService: HashtagsService,
              private ideaService: IdeaService) {
  }

  ngOnInit() {
      this.availableLanguages = this.langService.availableLanguages;
      this.currentLanguage = this.langService.currentLanguage;
      this.langService.languageChanged.subscribe(
          (lang:string) => {
              console.log('new language set to ', lang);
              this.currentLanguage = lang;
          }
      );
    this.currentUser = this.userService.getCurrentUser();
    if (!this.currentUser.fb_first_name) {
      this.requestUsername = true;
    }
    this.editIdea = this.ideaService.ideaForEdit;
    if (this.editIdea) {
      this.updateIdea = true;
      this.newIdeaForm.patchValue({
        'title': this.editIdea.title,
        'description': this.editIdea.description,
        'typeSelect': this.editIdea.typeSelectId
      })
    } else {
      this.newIdeaForm.patchValue({
        'title': '',
        'description': '',
        'typeSelect': '-'
      })
    }
    // setTimeout(() => {
    //   this.hashtagsList = ['money', 'politics', 'refugees', 'borders'];
    //   this.showTagsInput = true;
    //   this.ref.detectChanges();
    // }, 100);
    this.tagsService.getHashtags()
      .subscribe(
        data => {

          let jsondata = JSON.parse(data['_body']);
          this.tagsService.hashtagsList =
            this.hashtagsList =
              this.compileTagsList(this.tagsService.hashtags =
                this.tagsService.parseTags(jsondata))

          this.showTagsInput = true;
          this.ideaHashtags = this.editIdea ?  this.editIdea.hashtags : [];
          this.ref.detectChanges();
          this.refreshInterval = setInterval(() => this.ref.detectChanges(), 100);

        },
        error => console.log('hashtags error:', error)
      )
    //register for component reset, if the 'new idea' button is pressed again
    // after adding one idea
    this.ideaService.refreshNewIdea.subscribe(
      (val: boolean) => {

        this.ideaAdded = false;
        this.ref.detectChanges();
        //this.resetForm();
      }
    )
  }

  onUsernameAdded() {
    this.currentUser.fb_first_name = this.username.nativeElement.value;
    if (this.currentUser.fb_first_name.indexOf(' ')>-1) {
      let arr = this.currentUser.fb_first_name.split(' ');
      this.currentUser.fb_last_name = arr.slice(1,arr.length).join(' ');
      this.currentUser.fb_first_name = arr[0];
    }
    this.userService.update(this.currentUser).subscribe(
        data => {
            this.userService.updateLocalUser(this.currentUser);
        },
        error => {

        }
    )
    this.requestUsername = false;
  }

  onContinueWithout() {
    this.router.navigate(['/ideas']);
  }

  ngOnDestroy() {
    clearInterval(this.refreshInterval);
  }

  compileTagsList(tags:Hashtag[]):string[] {
    let result = [];
    tags.forEach(function(tag) {
      result.push(tag.name);
    });
    return result;
  }

  resetForm() {
    this.newIdeaForm.reset();
    this.fileUploadEl.nativeElement.value = '';
    this.newIdeaForm.patchValue({
      'typeSelect': '-'
    })
    this.img1Selected = this.img2Selected = this.img3Selected = false;
  }

  onSubmit() {
    // TODO | Seems that direct update and add doesn't work,
    // TODO | so for now just update existing tags, and add new ones
    // TODO | !also add them to the service list!
    let valid = true;
    let newIdea:Idea = new Idea();
    if (this.newIdeaForm.get('typeSelect').value == '-') {
      this.noType = true;
      valid = false;
      //return;
    } else {
      newIdea.typeSelect = this.ideaTypes[this.newIdeaForm.get('typeSelect').value].text;
    }

    newIdea.title = this.newIdeaForm.get('title').value;
    newIdea.description = this.newIdeaForm.get('description').value;
    newIdea.typeSelectId = this.newIdeaForm.get('typeSelect').value;
    newIdea.user_id = this.currentUser._id;
    //if (this.newIdeaForm.get('hashtags').value) {
    //  newIdea.hashtags = this.newIdeaForm.get('hashtags').value.split(' ');
    //}
    //newIdea.hashtags = this.ideaHashtags.join('|').split('#').join().split('|');

    newIdea.location_lat = this.currentUser.location_lat;
    newIdea.location_long =  this.currentUser.location_long;
    newIdea.location_label =  this.currentUser.location_label;

    /*if (this.fileUploadEl.nativeElement.files.item(0)) {

    }*/
    let bypassUpload:boolean = false;
    let index = '';
    if(this.fileUploadEl.nativeElement.files.item(0) === null) {
      if (!(this.img1Selected || this.img2Selected || this.img3Selected)) {
        if (!this.editIdea) {
          this.imageNeeded = true;
          valid = false;
        }
      } else {
        index = this.img1Selected ? 'img1' : (this.img2Selected ? 'img2' : 'img3');
        newIdea.imgURL = this.defaultImages[index];
        bypassUpload = true;
      }

    }
    if (!valid && !this.editIdea) {
      return;
    }


    this.addBtnRef.nativeElement.disabled = true;

    if (this.updateIdea) {
      // initial idea image was default image, and now we have an uploaded file
      if(this.fileUploadEl.nativeElement.files.item(0) !== null) {
        newIdea.imgURL = null;
      } else {
        newIdea.imgURL = newIdea.imgURL || this.editIdea.imgURL;
        newIdea.imgType   = newIdea.imgURL ? '' : newIdea.imgType || this.editIdea.imgType;
        newIdea.imgBuffer = newIdea.imgURL ? '' : newIdea.imgBuffer || this.editIdea.imgBuffer;
      }

      newIdea._id = this.editIdea._id;

      // TODO if hashtags are different, remove old tags and add new ones

      this.ideaService.updateIdea(newIdea).subscribe(
        data => {
          if(this.fileUploadEl.nativeElement.files.item(0) !== null) {
            let fd: FormData = new FormData();
            fd.append('photo', this.fileUploadEl.nativeElement.files.item(0));
            fd.append('ideaId', newIdea._id);
            this.ideaService.uploadImage(fd)
              .subscribe(
                data => {
                  this.afterIdeaAdded(newIdea._id);
                },
                error => {
                }
              )
          } else {
            this.afterIdeaAdded(newIdea._id);
          }
        },
        error => {
          console.log('error after idea update:', error)
        }
      )
    } else {
      this.ideaService.saveIdea(newIdea).subscribe(
        data => {
          let res: string = JSON.parse(data['_body']).ops[0]._id;
          // idea created, now update with the image
          if (!bypassUpload) {
            let fd: FormData = new FormData();
            fd.append('photo', this.fileUploadEl.nativeElement.files.item(0));
            fd.append('ideaId', res);
            this.ideaService.uploadImage(fd)
              .subscribe(
                data => {
                  this.afterIdeaAdded(res);
                },
                error => {
                }
              )
          } else {
            this.afterIdeaAdded(res);
          }
        },
        error => {
        }
      );
      for (let k in this.ideaHashtags) {
        this.tagsService.updateHashtag(this.ideaHashtags[k])
           .subscribe(
             data => console.log('data after update:', data),
             error => console.log('error after update:', error)
           );
      }
    }

  }

  deleteIdea() {
    this.ideaService.deleteIdea(this.editIdea._id)
      .subscribe(
        data => {console.log('success after delete', data)},
        error => {console.log('error after delete', error)}
      )
  }

  afterIdeaAdded(res:string) {
    this.addingIdea = false;
    this.ideaAdded = true;
    this.ideaURL = '/ideas/'+res;
    this.userService.updateLocalUser(this.userService.getCurrentUser());
    this.resetForm();
    this.ref.detectChanges();
  }

  defaultImageClick(ev) {
    switch(ev.target.id) {
      case "img1":
        this.img1Selected = true;
        this.img2Selected = this.img3Selected = false;
        break;
      case "img2":
        this.img2Selected = true;
        this.img1Selected = this.img3Selected = false;
        break;
      case "img3":
        this.img3Selected = true;
        this.img2Selected = this.img1Selected = false;
        break;
    }
    this.ref.detectChanges();

  }

}
