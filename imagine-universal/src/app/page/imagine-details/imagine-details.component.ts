import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-imagine-details',
  templateUrl: './imagine-details.component.html',
  styleUrls: ['./imagine-details.component.css']
})
export class ImagineDetailsComponent implements OnInit {

  tempSub:Subscription;
  userLoggedIn:boolean = false;

  constructor(private userService:UserService,
              private ref:ChangeDetectorRef) { }

  ngOnInit() {
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
