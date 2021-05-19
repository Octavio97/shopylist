import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfigModalPage } from '../../pages/config-modal/config-modal.page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string;
  @Input() ruta: any;
  
  constructor(private modalCtlr: ModalController) {  }

  ngOnInit() {
  }

  async abrirConfig() {
    const modal = await this.modalCtlr.create({
      component: ConfigModalPage
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
  }
}
