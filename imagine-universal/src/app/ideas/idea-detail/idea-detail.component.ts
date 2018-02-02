
import {
  AfterViewInit, PLATFORM_ID, Inject, ElementRef, KeyValueDiffers,
  ApplicationRef, ChangeDetectorRef, Component, DoCheck, OnInit,
  SecurityContext, ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {IdeaService} from '../../services/ideas.service';
import {Idea} from "../../shared/idea.model";
import {DomSanitizer} from "@angular/platform-browser";
import {UserService} from "../../services/user.service";
import {RedirectService} from "../../services/redirect.service";
import {AppConfig} from "../../app.config";
import {FacebookSdkService} from "../../login/facebook/facebook-sdk.service";

@Component({
  selector: 'app-idea-detail',
  templateUrl: './idea-detail.component.html',
  styleUrls: ['./idea-detail.component.css']
})
export class IdeaDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('el')
    target: ElementRef;

  selectedIdea:  Idea = new Idea();
  loading: boolean = false;
  ownIdea:boolean = false;

  ideaId: string;
  imageURL:string;
  ideaTitle:string;
  ideaDescription:string;
  ideaType:string;
  userName:string;
  userIdeasURL:string
  html:any;
  isServerSide = false;
  pageURL = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private ideaService: IdeaService,
              private config: AppConfig,
              private fbSDK:FacebookSdkService,
              private router: Router,
              private redirect: RedirectService,
              private changeDetector: ChangeDetectorRef) {
    //let a:string = '<img width="480px" src="{{imageURL}}" alt="biblioteca" (click)="onImgClick()"><p *ngIf="!loading"> info for idea with id {{selectedIdea._id}}<br> title: {{selectedIdea.title}}<br> description: {{selectedIdea.description}}<br> type: {{selectedIdea.typeSelect}}<br> added by: {{selectedIdea.user_id}}<br></p><hr><div id="disqus_thread"></div>';
    //this.html = sanitizer.sanitize(SecurityContext.NONE, a);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isServerSide = true;
    }
    this.pageURL = "https://imaginallthepeople.world"+this.router.url;
    this.ideaService.getIdeaById(this.activatedRoute.snapshot.params.id).subscribe(
      data => {
        //console.log(data['_body']);
        this.selectedIdea = this.ideaService.convertDbItemToIdea(JSON.parse(data['_body'])[0], true);
        if (isPlatformBrowser(this.platformId) &&
          (this.userService.getCurrentUser() !== undefined) &&
          (this.userService.getCurrentUser()._id == this.selectedIdea.user_id)) {
          this.ownIdea = true;
          this.changeDetector.detectChanges()
        }
        this.loading = false;
        this.ideaId = this.selectedIdea._id;
        this.ideaTitle = this.selectedIdea.title;
        this.ideaDescription = this.selectedIdea.description;
        this.userIdeasURL = "/ideasBy/"+this.selectedIdea.user_id;
        this.ideaType = this.selectedIdea.typeSelect;
        // TODO move this to a service
        this.imageURL = this.selectedIdea.imgType ?
          this.compileImageData(this.selectedIdea.imgType, this.selectedIdea.imgBuffer) :
          this.selectedIdea.imgURL;
        if (isPlatformBrowser(this.platformId)) {
          this.userService.getUsernameById(this.selectedIdea.user_id)
            .subscribe(
              data => {
                if (data.firstName || data.lastName) {
                  this.userName = (data.firstName ? data.firstName : '') + (data.lastName ? ' ' + data.lastName : '');
                } else {
                  this.userName = 'Anonymous';
                }
                this.changeDetector.detectChanges();
              },
              error => {
              }
            );
        }
      },
      error => {
      }
    )
    //this.ideaOwner = this.userService.getById()
  }
  // TODO move this to a service
  compileImageData(type, data):string {
    //console.log('compile image data from ', type, data.length);
    let result = "data:" + type + ";base64," + data;
    return result;
  }

  ngAfterViewInit() {
    if (this.userService.currentUser) {
      let s = document.createElement("script");
      s.type = "text/javascript";
      s.innerHTML = 'var disqus_config = function () { this.page.url = \"http://localhost:4200/ideas/' + this.activatedRoute.snapshot.params.id + '\"; this.page.identifier = \"' + this.activatedRoute.snapshot.params.id + '\"; }; (function() { var d = document, s = d.createElement(\"script\"); s.src = \"https://imagineallthepeople-world.disqus.com/embed.js\"; s.setAttribute(\"data-timestamp\", +new Date()); (d.head || d.body).appendChild(s); })();';
      this.target.nativeElement.appendChild(s);
    }
  }

  onEditIdea() {
    this.ideaService.ideaForEdit = this.selectedIdea;
    this.router.navigate(['/new-idea']);
  }

  onSupport() {
    if (!this.userService.currentUser) {
      this.redirect.saveRedirect('/ideas/'+this.activatedRoute.snapshot.params.id);
      this.router.navigate(['/login']);
    } else {
      this.userService.addJoinedIdea(this.selectedIdea._id);
    }
  }

  onShare() {
    let url = this.config.pageUrl+'/ideas/'+this.selectedIdea._id;
    this.fbSDK.share(url);
    this.fbSDK.shareObservable.subscribe(
      (data) => console.log('after share data:', data),
      (error) => console.log('after share error:', error),
      () => console.log('after share complete')
    );
  }

}
