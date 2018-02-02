import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ImagineDetailsComponent } from './page/imagine-details/imagine-details.component';
import { ContributeComponent } from './page/contribute/contribute.component';
import { IdeasComponent } from './ideas/ideas.component';
import { HomeComponent } from './page/home/home.component';
import { IdeaDetailComponent } from './ideas/idea-detail/idea-detail.component';
import { NewIdeaComponent } from './ideas/new-idea/new-idea.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './page/signup/signup.component';
import {LocationComponent} from './page/location/location.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AuthGuard } from './guards/auth-guard.service';
import { NotfoundComponent } from './page/notfound/notfound.component'
import {FaqComponent} from "./page/faq/faq.component";
import {PrivacyComponent} from "./page/privacy/privacy.component";
import {ProfileHomeComponent} from "./user/profile/profile-home/profile-home.component";
import {ProfileNotificationsComponent} from "./user/profile/profile-notifications/profile-notifications.component";
import {InspiringIdeasComponent} from "./page/inspiring-ideas/inspiring-ideas.component";
import {IdeaByUserComponent} from "./ideas/idea-by-user/idea-by-user.component";
import {JoinedComponent} from "./ideas/joined/joined.component";
import {ForgotComponent} from "./user/forgot/forgot.component";

const appRoutes:Routes = [

  {path: 'imagine', component: ImagineDetailsComponent},
  {path: 'contribute', component: ContributeComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'privacy', component: PrivacyComponent},
  //{path: 'ideas', component: IdeasComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  {path: 'ideas', component: IdeasComponent, pathMatch: 'full'},

  {path: 'inspiring', component: InspiringIdeasComponent},
  {path: 'ideas/:id', component: IdeaDetailComponent, pathMatch: 'full'},
  {path: 'reset/:id', component: ForgotComponent, pathMatch: 'full'},
  {path: 'ideasBy/:id', component: IdeaByUserComponent, pathMatch: 'full'},
  {path: 'joined', component: JoinedComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  {path: 'new-idea', component: NewIdeaComponent, canActivate: [AuthGuard], pathMatch: 'full'},

  /*{path: 'ideas', component: IdeasComponent, children: [
    {path: ':id', component: IdeaDetailComponent},
    {path: 'new', component: NewIdeaComponent}
  ]},*/

  {path: 'profile', canActivate: [AuthGuard], component: ProfileComponent, children: [
    {path: '', component: ProfileHomeComponent, pathMatch: 'full'},
    {path: 'notifications', component: ProfileNotificationsComponent},
  ]},
  {path: 'location', component: LocationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path:'**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
