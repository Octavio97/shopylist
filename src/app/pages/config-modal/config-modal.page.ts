import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LanguageService } from '../../services/language.service';
import { App } from '../../models/app.model';
import { AboutPage } from '../about/about.page';

@Component({
  selector: 'app-config-modal',
  templateUrl: './config-modal.page.html',
  styleUrls: ['./config-modal.page.scss'],
})
export class ConfigModalPage implements OnInit {
  app: App;

  constructor(private idioma: LanguageService,
              private modalCtlr: ModalController) {  }

  ngOnInit() {  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.app = this.idioma.getApp();
  }

  cerrarConfig() {
    this.modalCtlr.dismiss();
  }

  setLanguage(evento) {
    this.app.language = evento.detail.value
    this.idioma.changeData(this.app, 'app.json');
    this.idioma.setAppLanguage(this.app.language);
  }

  setDarkMode(evento) {
    this.app.darkMode = evento.detail.checked
    this.idioma.changeData(this.app, 'app.json');
    if (evento.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }

  async about() {
    const modal = await this.modalCtlr.create({
      component: AboutPage
    });

    return await modal.present();
  }
}
