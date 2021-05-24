import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { LanguageService } from '../../services/language.service';
import { ConfigModalPage } from '../config-modal/config-modal.page';
import { Page1 } from '../../models/page1.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  data: Page1;

  constructor(private idioma: LanguageService, private modalCtrl: ModalController) {  }
  
  ngOnInit(): void {
    this.idioma.loadData();
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.idioma.setAppLanguage(this.idioma.getApp().language);
    this.data = this.idioma.getPage1();
  }

  async abrirConfig() {
    const modal = await this.modalCtrl.create({
      component: ConfigModalPage
    });

    await modal.present();
  }
}
