export class RedirectService {

  redirectURL:string = null;

  saveRedirect(url) {
    this.redirectURL = url;
    console.log('store:', url);
  }

  getRedirect():string {
    console.log('fetch:', this.redirectURL);
    return this.redirectURL;
  }

  resetRedirectURL() {
    this.redirectURL = null;
  }
}
