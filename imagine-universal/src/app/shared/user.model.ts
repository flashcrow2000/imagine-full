export class User {
    type: string;
    _id: string;
    username: string;
    password: string;
    email: string;
    manifestoAccepted: boolean;
    token: string;
    // use imgURL if imgType and imgBuffer are not available
    imgURL:string;
    imgBuffer: string;
    imgType: string;
    following: string[] = [];

    fb_first_name: string;
    fb_last_name: string;
    fb_user_id: string;
    fb_access_token: string;

    g_first_name:string;
    g_last_name:string;
    g_user_id: string;

    location_lat: string;
    location_long: string;
    location_label: string = 'Location not set';

    fbAccountName: string;
    twitterAccountName:string;
    instagramAccountName:string;
    webpage:string;


    constructor() {
      this.type = "imagine";
      this.manifestoAccepted = false;
    }

  parse(data:any) {
    for (let k in data) {
      this[k] = data[k]
    }
  }
}
