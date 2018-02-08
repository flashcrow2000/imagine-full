import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AppConfig} from "../app.config";
import {JwtService} from "./jwt.service";
import {Notification} from "../shared/notification.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class NotificationsService {
  // TODO fetch the notificationsCount for a user only once
  notificationsUpdate = new Subject();
  constructor(private http: Http,
              private config: AppConfig,
              private jwt: JwtService) {}

  addNotification(ideaId:string, userId:string, type:string = 'followers') {
    let request:Notification = new Notification();
    request.target_id = ideaId;
    request.by_user_id = userId;
    request.for_user_id = '-1'; // replace this from server code
    request.type = type;

    return this.http.post(this.config.apiUrl + '/notif/new',
                          request, this.jwt.getJWT())
  }

  getNotificationsForUser(userId:string, type:string='full') {
    return this.http.post(this.config.apiUrl+'/notif/forUser', {id:userId, type:type}, this.jwt.getJWT());
  }
}
