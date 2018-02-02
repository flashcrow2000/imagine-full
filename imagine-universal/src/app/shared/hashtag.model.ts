export class Hashtag {
  _id: string;
  name: string;
  uses: number = 0;

  parse(data:any) {
    //console.log('parse idea', data);
    for (let k in data) {
      //console.log('search for ', k);
      this[k] = data[k]
    }
  }
}
