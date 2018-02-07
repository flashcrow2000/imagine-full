export class Hashtag {
  _id: string;
  name: string;
  uses: number = 0;

  constructor(name = '', uses = 0) {
    this.name = name;
    this.uses = uses;
  }

  parse(data:any) {
    for (let k in data) {
      this[k] = data[k]
    }
  }
}
