import { Subject } from 'rxjs/Subject';

export class LanguagesService {
    currentLanguage = 'english';
    availableLanguages = {
        ENGLISH: 'english',
        SPANISH: 'spanish'
    };
    languageChanged = new Subject();

    saveCurrentLanguage(lang) {
        this.currentLanguage = lang;
        this.languageChanged.next(this.currentLanguage);
    }
}