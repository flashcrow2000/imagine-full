import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {

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
