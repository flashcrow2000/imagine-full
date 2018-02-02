import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
/// PAGE
import { AppComponent } from './app.component';
import { MainMenuComponent } from './page/main-menu/main-menu.component';
import { HeaderComponent } from './page/header/header.component';
import { HomeComponent } from './page/home/home.component';
import { ImagineDetailsComponent } from './page/imagine-details/imagine-details.component';
import { ContributeComponent } from './page/contribute/contribute.component';
import { LocationComponent } from './page/location/location.component';
import { ManifestoComponent } from './page/manifesto/manifesto.component';
import { SignupComponent } from './page/signup/signup.component';
/// USER
import { UserInfoComponent } from './user/user-info/user-info.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ProfileComponent } from './user/profile/profile.component';
/// LOGIN
import { LoginComponent } from './login/login.component';
import { FacebookSdkService } from './login/facebook/facebook-sdk.service';
import { GoogleLoginComponent } from './login/google-login/google-login.component';
// IDEAS
import { IdeasComponent } from './ideas/ideas.component';
import { SingleIdeaComponent } from './ideas/single-idea/single-idea.component';
import { FeaturedIdeasComponent } from './ideas/featured-ideas/featured-ideas.component';
import { IdeaDetailComponent } from './ideas/idea-detail/idea-detail.component';
/// SERVICES
import { UserService } from './services/user.service';
import { AuthenticationService } from './login/classic/authentication.service';
import { IdeaService } from './services/ideas.service';
import { JwtService } from './services/jwt.service';
import {HashtagsService} from './services/hashtags.service';
import {RedirectService} from './services/redirect.service';
/// Other

import { AuthGuard } from './guards/auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppConfig } from './app.config';
import { NotfoundComponent } from './page/notfound/notfound.component';
import { ReCaptchaModule } from 'angular2-recaptcha';

// google places
import { AgmCoreModule } from '@agm/core';
import { NewIdeaComponent } from './ideas/new-idea/new-idea.component';
import { FooterComponent } from './page/footer/footer.component';
import { NotificationsService } from './services/notifications.service';
import { CommentsComponent } from './comments/comments/comments.component';
import { FaqComponent } from './page/faq/faq.component';
import { PrivacyComponent } from './page/privacy/privacy.component';
import { PopularComponent } from './ideas/popular/popular.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ProfileHomeComponent } from './user/profile/profile-home/profile-home.component';
import { ProfileNotificationsComponent } from './user/profile/profile-notifications/profile-notifications.component';
import { SingleNotificationComponent } from './notifications/single-notification/single-notification.component';
import { InspiringIdeasComponent } from './page/inspiring-ideas/inspiring-ideas.component';
import { IdeaByUserComponent } from './ideas/idea-by-user/idea-by-user.component';
import { JoinedComponent } from './ideas/joined/joined.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {RlTagInputModule} from './modules/angular2-tag-input/tag-input.module';
import { ForgotComponent } from './user/forgot/forgot.component';
import {RebuildTagsComponent} from "./page/rebuild-tags/rebuild-tags.component";
// import {TagInputComponent} from "./modules/angular2-tag-input/components/tag-input/tag-input.component";


@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HeaderComponent,
    HomeComponent,
    ImagineDetailsComponent,
    ContributeComponent,
    IdeasComponent,
    SingleIdeaComponent,
    FeaturedIdeasComponent,
    IdeaDetailComponent,
    LoginComponent,
    SignupComponent,
    ManifestoComponent,
    LocationComponent,
    GoogleLoginComponent,
    ProfileComponent,
    UserInfoComponent,
    EditUserComponent,
    NotfoundComponent,
    NewIdeaComponent,
    FooterComponent,
    CommentsComponent,
    FaqComponent,
    PrivacyComponent,
    PopularComponent,
    ProfileHomeComponent,
    ProfileNotificationsComponent,
    SingleNotificationComponent,
    InspiringIdeasComponent,
    IdeaByUserComponent,
    JoinedComponent,
    ForgotComponent,
    RebuildTagsComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA8NoSd_Eh1P1M5TNGlEK76Qi7skKg0qlg',
      libraries: ['places']
    }),
    ClickOutsideModule,
//    RlTagInputModule,
    BrowserModule.withServerTransition({appId: 'imagineallthepeople'}),
    ReCaptchaModule,
    FormsModule,
    ReactiveFormsModule,
    RlTagInputModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [IdeaService,
              JwtService,
              UserService,
              HashtagsService,
              RedirectService,
              AuthenticationService,
              FacebookSdkService,
              NotificationsService,
              AppConfig,
              AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
