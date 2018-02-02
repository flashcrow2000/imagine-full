export class Notification {
  type: string; // comment | followers
  _id: string;
  by_user_id: string;
  for_user_id: string;
  target_id: string; // comment id or idea id for followers
  read: boolean = false;

  constructor() {}

  parse(data:any) {
    for (let k in data) {
      this[k] = data[k]
    }
  }
}
