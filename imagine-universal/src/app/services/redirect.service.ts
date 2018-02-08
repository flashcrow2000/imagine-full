export class RedirectService {

  redirectURL:string = null;

  saveRedirect(url) {
    this.redirectURL = url;
  }

  getRedirect():string {
    return this.redirectURL;
  }

  resetRedirectURL() {
    this.redirectURL = null;
  }
}
