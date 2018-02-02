export class FbUser{
    type: string;
    first_name: string;
	  last_name: string;
	  email: string;
    fb_user_id: string;
    access_token: string;	

    constructor() {
      this.type = 'facebook';
    }
}