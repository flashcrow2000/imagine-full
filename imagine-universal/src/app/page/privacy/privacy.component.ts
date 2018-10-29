import { Component, OnInit } from '@angular/core';
import {LanguagesService} from "../../services/languages.service";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  currentLanguage: string = '';

  constructor(private langService:LanguagesService) { }

  ngOnInit() {
    this.currentLanguage = this.langService.currentLanguage;
  }

}
