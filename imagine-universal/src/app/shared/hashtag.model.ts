export class Hashtag {
  _id: string;
  name: string;
  uses: number = 0;

  constructor(name = '', uses = 0) {
    this.name = name;
    this.uses = uses;
  }

  parse(data:any) {
    //console.log('parse idea', data);
    for (let k in data) {
      //console.log('search for ', k);
      this[k] = data[k]
    }
  }
}
