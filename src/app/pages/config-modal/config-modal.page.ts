import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LanguageService } from '../../services/language.service';
import { Idioma } from '../../models/idioma.model';
import { App } from '../../models/app.model';

@Component({
  selector: 'app-config-modal',
  templateUrl: './config-modal.page.html',
  styleUrls: ['./config-modal.page.scss'],
})
export class ConfigModalPage implements OnInit {
  data: any;
  language: Idioma[];
  app: App;


  constructor(private idioma: LanguageService, private modalCtlr: ModalController) { }

  ngOnInit() {
    this.data = this.idioma.getPage3();
    this.language = this.idioma.getLanguage();
    this.app = this.idioma.getApp();
  }

  cerrarConfig() {
    this.modalCtlr.dismiss();
  }

  setLanguage(evento) {
    this.idioma.setData(evento.detail.value);
  }

  setDarkMode(evento) {
    this.idioma.setDarkMode(evento.detail.value);
  }

}
