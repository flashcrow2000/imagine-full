import { Component, OnInit } from '@angular/core';
import {LanguagesService} from "../../services/languages.service";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
    availableLanguages:Object = {};
    currentLanguage: string = '';
  constructor(private langService: LanguagesService) { }

  ngOnInit() {
      this.availableLanguages = this.langService.availableLanguages;
      this.currentLanguage = this.langService.currentLanguage;
      this.langService.languageChanged.subscribe(
          (lang:string) => {
              console.log('new language set to ', lang);
              this.currentLanguage = lang;
          }
      );
  }

}
