import {environment} from "../environments/environment";

export class AppConfig {
  /*
  public readonly apiUrl = environment.production ? 'https://api.imagineallthepeople.world' : 'http://localhost:4000';
  public readonly pageUrl = environment.production ? 'https://www.imagineallthepeople.world' : 'http://localhost:4200';
  */
  //public readonly apiUrl = 'http://localhost:4000';

  public readonly apiUrl = environment.apiUrl;
  public readonly pageUrl = environment.pageUrl;
};
