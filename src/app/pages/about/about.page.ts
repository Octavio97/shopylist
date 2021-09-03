import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Datos } from '../../models/datos.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
title: string;
text: Datos[];
  constructor(private modalCtlr: ModalController,
              private translate: TranslateService) { }

  ngOnInit() {
    this.translate.stream('page3.settings.2.name').subscribe((res: string) => {
      this.title = res;
    });
    
    this.translate.stream('page3.settings.2.data').subscribe((res: Datos[]) => {
      this.text = res;
    });
  }
  
  cerrarConfig() {
    this.modalCtlr.dismiss();
  }
}
