import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../../services/user.service";
import {LanguagesService} from "../../services/languages.service";

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {

  tempSub:Subscription;
  userLoggedIn:boolean = false;
    availableLanguages:Object = {};
    currentLanguage: string = '';
  constructor(private userService:UserService,
              private langService: LanguagesService,
              private ref:ChangeDetectorRef) { }

  ngOnInit() {
      this.availableLanguages = this.langService.availableLanguages;
      this.currentLanguage = this.langService.currentLanguage;
      this.langService.languageChanged.subscribe(
          (lang:string) => {
              console.log('new language set to ', lang);
              this.currentLanguage = lang;
          }
      );
    this.tempSub = this.userService.userActivated.subscribe(
      (loggedIn: boolean) =>
      {
        this.userLoggedIn = loggedIn;
        this.ref.detectChanges();
      }
    )
    this.userLoggedIn = (this.userService.currentUser !== undefined &&
      this.userService.loginType != '');
  }

}
