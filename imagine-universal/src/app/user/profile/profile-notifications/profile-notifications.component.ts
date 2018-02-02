import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NotificationsService} from "../../../services/notifications.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../shared/user.model";
import {Notification} from "../../../shared/notification.model";

@Component({
  selector: 'app-profile-notifications',
  templateUrl: './profile-notifications.component.html',
  styleUrls: ['./profile-notifications.component.css']
})
export class ProfileNotificationsComponent implements OnInit {

  notifications:Notification[];
  currentUser: User;

  constructor(private notifService:NotificationsService,
              private ref: ChangeDetectorRef,
              private userService:UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.notifService.getNotificationsForUser(this.currentUser._id)
      .subscribe(
        data => {
          console.log('notifications result:', data);
          let res = JSON.parse(data['_body']).notifications;

          this.notifications = this.parseNotifications(res);
          console.log('notificationsCount:', this.notifications);
          this.notifService.notificationsUpdate.next(0);
          this.ref.detectChanges();
        },
        error => {
          console.log('notificationsCount error:', error);
        }
      )
  }

  parseNotifications(notif): Notification[] {
    var result:Notification[] = [];
    for (let k:number=0; k<notif.length; k++) {
      var temp = new Notification();
      temp.parse(notif[k]);
      result.push(temp);
    }

    return result;
  }

}
