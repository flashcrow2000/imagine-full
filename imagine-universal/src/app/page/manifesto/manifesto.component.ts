import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from '../../services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import {LanguagesService} from "../../services/languages.service";

@Component({
  selector: 'app-manifesto',
  templateUrl: './manifesto.component.html',
  styleUrls: ['./manifesto.component.css']
})
export class ManifestoComponent implements OnInit, OnDestroy {

  currentUser: any;
  userSubscription: Subscription;
  showManifesto:boolean = true;
    availableLanguages:Object = {};
    currentLanguage: string = '';
  constructor(
      private userService: UserService,
      private langService: LanguagesService,
      private router: Router) {}

  ngOnInit() {
      this.availableLanguages = this.langService.availableLanguages;
      this.currentLanguage = this.langService.currentLanguage;
      this.langService.languageChanged.subscribe(
          (lang:string) => {
              console.log('new language set to ', lang);
              this.currentLanguage = lang;
          }
      );
    this.userSubscription = this.userService.userActivated.subscribe(
      (loggedIn: boolean) => {
        loggedIn ? this.currentUser = this.userService.getCurrentUser() : this.currentUser = undefined;
        this.showManifesto = this.currentUser ? !this.currentUser.manifestoAccepted : false;
      }
    )
    this.currentUser = this.userService.getCurrentUser();
    this.showManifesto = this.currentUser ? !this.currentUser.manifestoAccepted : false;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onAccept() {
    this.currentUser.manifestoAccepted = true;
    this.userService.update(this.currentUser).subscribe(
                data => {
                    this.userService.updateLocalUser(this.currentUser);
                    this.router.navigate(['/location']);
                },
                error => {
                });
    this.showManifesto = false;
  }

}
