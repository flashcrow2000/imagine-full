import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'location': new FormControl()
    });

    this.signupForm.patchValue({
      'userData': {
        'username': 'test',
      }
    });

    if (this.userService.checkUsernameHasOnlyNumber()) {
      this.signupForm.get('userData').get('username').disable();
      this.signupForm.patchValue({
      'userData': {
        'username': 'Social network linked account',
      }
    });
    }
  }

  onSubmit() {

  }

}
