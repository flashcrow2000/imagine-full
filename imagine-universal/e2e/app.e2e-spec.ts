import { ImagineAppPage } from './app.po';

describe('imagine-app App', () => {
  let page: ImagineAppPage;

  beforeEach(() => {
    page = new ImagineAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
