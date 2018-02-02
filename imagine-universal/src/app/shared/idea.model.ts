export class Idea {
  _id:string;
  title:string;
  description:string;
  typeSelect:string;
  typeSelectId:string;
  user_id:string;
  hashtags: string[] = [];
  followers: string[] = [];
  followersTotal:number = 0;
  location_lat:string;
  location_long:string;
  location_label:string;
  shares: number = 0;
  imgURL: string;
  // OR
  imgType: string;
  imgBuffer:string;

  constructor() {}

  addFolower(id:string) {
    if (id in this.followers) {
      // user already exists
    } else {
      this.followers.push(id);
      this.followersTotal = this.followers.length;
    }
  }

  parse(data:any) {
    //console.log('parse idea', data);
    for (let k in data) {
      //console.log('search for ', k);
      this[k] = data[k]
    }
  }

  removeFollower(id:string) {
    let userIndex = this.followers.indexOf(id);
    if (userIndex !== -1) {
      this.followers.splice(userIndex, 1);
    }
  }
}
