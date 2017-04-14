import { PoliVotoPage } from './app.po';

describe('poli-voto App', () => {
  let page: PoliVotoPage;

  beforeEach(() => {
    page = new PoliVotoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
