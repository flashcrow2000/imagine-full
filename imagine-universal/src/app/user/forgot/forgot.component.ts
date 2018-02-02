import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  @ViewChild('p1')
    pwd1: ElementRef;
  @ViewChild('p2')
    pwd2: ElementRef;
  noMatch = false;
  resetId = null;
  resetError = false;
  resetSuccess = false;

  constructor(private activatedRoute:ActivatedRoute,
              private userService:UserService) { }

  ngOnInit() {
    this.resetId = this.activatedRoute.snapshot.params.id
  }

  testPasswords() {
    this.noMatch = this.pwd1.nativeElement.value != this.pwd2.nativeElement.value;
  }

  reset() {
    console.log('reset password for user with resetID:', this.resetId);
    this.userService.resetPassword(this.resetId, this.pwd1.nativeElement.value)
      .subscribe(
        data => {
          console.log('data after pwd reset', data);
          this.resetSuccess = true;
        },
        error => {
          console.log('error after pwd reset', error);
          this.resetError= true;
        }
      )
  }

}
