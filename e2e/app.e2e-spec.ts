<<<<<<< HEAD
import { PoliVotoPage } from './app.po';

describe('poli-voto App', () => {
  let page: PoliVotoPage;

  beforeEach(() => {
    page = new PoliVotoPage();
=======
import { PolivotoPage } from './app.po';

describe('polivoto App', () => {
  let page: PolivotoPage;

  beforeEach(() => {
    page = new PolivotoPage();
>>>>>>> Realizando cambios .gitignore
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
