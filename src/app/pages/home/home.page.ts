import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { LanguageService } from '../../services/language.service';
import { ConfigModalPage } from '../config-modal/config-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  data: any;

  constructor(private idioma: LanguageService, private modalCtrl: ModalController) {}
  
  ngOnInit(): void {
    this.data = this.idioma.getPage1();
  }
  
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (this.data[1].categories.length == 10) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  async abrirConfig() {
    const modal = await this.modalCtrl.create({
      component: ConfigModalPage
    });

    await modal.present();
  }
}
