import { PolivotoPage } from './app.po';

describe('polivoto App', () => {
  let page: PolivotoPage;

  beforeEach(() => {
    page = new PolivotoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
