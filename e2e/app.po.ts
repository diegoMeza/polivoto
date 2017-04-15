import { browser, element, by } from 'protractor';

<<<<<<< HEAD
export class PoliVotoPage {
=======
export class PolivotoPage {
>>>>>>> Realizando cambios .gitignore
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
