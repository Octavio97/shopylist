import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { LanguageService } from '../../services/language.service';
import { Lista } from 'src/app/models/lista.model';
import { App } from '../../models/app.model';
import { ArticuloLista } from '../../models/artLista.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.page.html',
  styleUrls: ['./list-modal.page.scss'],
})
export class ListModalPage implements OnInit {
@Input() listaPrev: Lista;
@Input() isEdit: boolean;
app: App;
 
  constructor(private modalCtrl: ModalController,
              private idioma: LanguageService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private translate: TranslateService) { }

  ngOnInit() {
    this.app = this.idioma.getApp();
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.

    if (!this.isEdit) {
      for (let i = 0; i < this.listaPrev.articles.length; i++) {
        if (this.listaPrev.articles[i].typeAmount === 'unidad') {
          var pieza;

          this.translate.stream('page3.settings.4.dimensions.6.dimensionId').subscribe((res: number) => {
            pieza = res;
          });

          this.listaPrev.articles[i].nameAmount = pieza;
        }
      }
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  async guardarLista() {
    var header1, header2, header3, subtitle1, subtitle2, subtitle3, cancelButton, confirmButton;
    
    this.translate.stream('page4.alerts.1.header').subscribe((res: string) => {
      header1 = res;
    });
    this.translate.stream('page4.alerts.1.subtitle').subscribe((res: string) => {
      subtitle1 = res;
    });
    this.translate.stream('page4.alerts.6.header').subscribe((res: string) => {
      header2 = res;
    });
    this.translate.stream('page4.alerts.6.subtitle').subscribe((res: string) => {
      subtitle2 = res;
    });
    this.translate.stream('page4.alerts.4.header').subscribe((res: string) => {
      header3 = res;
    });
    this.translate.stream('page4.alerts.4.subtitle').subscribe((res: string) => {
      subtitle3 = res;
    });
    this.translate.stream('page4.cancelButton').subscribe((res: string) => {
      cancelButton = res;
    });
    this.translate.stream('page4.confirmButton').subscribe((res: string) => {
      confirmButton = res;
    });

    const alert = await this.alertCtrl.create({
      header: header1,
      subHeader: subtitle1,
      buttons: [
        {
          text: cancelButton,
          role: 'cancel',
          cssClass: 'danger'
        },
        {
          text: confirmButton,
          handler: () => {
            for (let index = 0; index < this.listaPrev.articles.length; index++) {
              if (this.listaPrev.articles[index].price === null || 
                  this.listaPrev.articles[index].amount === null || 
                  this.listaPrev.articles[index].nameAmount === undefined || 
                  this.listaPrev.articles[index].typePrice === undefined ||
                  !this.listaPrev.articles[index].price.toString().match(/^[0-9]+$/) || 
                  !this.listaPrev.articles[index].amount.toString().match(/^[0-9]+$/)) {
                this.toast(header3, subtitle3, 'danger');
                return;
              }
            }

            this.idioma.writeList(this.listaPrev);
            this.toast(header2, subtitle2, 'success');
            this.modalCtrl.dismiss();
          }
        }
      ]
    });

    await alert.present();

    const { data } = await alert.onDidDismiss();
  }

  async toast(header, subtitle, color) {
    const toast = await this.toastCtrl.create({
        header: header,
        message: subtitle,
        duration: 2500,
        animated: true,
        translucent: true,
        color: color
    });

    await toast.present();

    const { data } = await toast.onDidDismiss();
  }
// eliminar articulo de lista existente
  async deleteItem(item: ArticuloLista) {
    var header, subtitle, confirmMessage, confirmButton, cancelButton;
    
    this.translate.stream('page4.alerts.9.header').subscribe((res: string) => {
      header = res;
    });
    this.translate.stream('page4.alerts.9.subtitle').subscribe((res: string) => {
      subtitle = res;
    });
    this.translate.stream('page4.alerts.9.confirmMessage').subscribe((res: string) => {
      confirmMessage = res;
    });
    this.translate.stream('page4.confirmButton').subscribe((res: string) => {
      confirmButton = res;
    });
    this.translate.stream('page4.cancelButton').subscribe((res: string) => {
      cancelButton = res;
    });

    const alert = await this.alertCtrl.create({
        header: header,
        subHeader: subtitle,
        buttons:[
          {
            text: cancelButton,
            role: 'cancel',
            cssClass: 'danger'
          },
          {
            text: confirmButton,
            handler: () => {
              var i = this.listaPrev.articles.indexOf(item);

              if (i !== -1) {
                this.listaPrev.articles.splice(i, 1);
              }
              this.listaPrev = this.listaPrev;
              this.idioma.deleteItem(this.listaPrev);

              if (this.listaPrev.articles.length === 0) {
                this.idioma.deleteList(this.listaPrev.listId);
                this.modalCtrl.dismiss();
              }
              this.toast(header, confirmMessage, 'success');
            }
          }
        ]
    });

    await alert.present();

    const { data } = await alert.onDidDismiss();
  }
// eliminar articulo de prelista
  async deleteItem2(articulos: ArticuloLista) {
    var header, subtitle, confirmMessage, confirmButton, cancelButton;
    
    this.translate.stream('page4.alerts.9.header').subscribe((res: string) => {
      header = res;
    });
    this.translate.stream('page4.alerts.9.subtitle').subscribe((res: string) => {
      subtitle = res;
    });
    this.translate.stream('page4.alerts.9.confirmMessage').subscribe((res: string) => {
      confirmMessage = res;
    });
    this.translate.stream('page4.confirmButton').subscribe((res: string) => {
      confirmButton = res;
    });
    this.translate.stream('page4.cancelButton').subscribe((res: string) => {
      cancelButton = res;
    });

    const alert = await this.alertCtrl.create({
        header: header,
        subHeader: subtitle,
        buttons:[
          {
            text: cancelButton,
            role: 'cancel',
            cssClass: 'danger'
          },
          {
            text: confirmButton,
            handler: () => {
              var i = this.listaPrev.articles.indexOf(articulos);

              if (i !== -1) {
                this.listaPrev.articles.splice(i, 1);
              }

              this.listaPrev = this.listaPrev;

              if (this.listaPrev.articles.length === 0) {
                this.modalCtrl.dismiss();
              }

              this.toast(header, confirmMessage, 'success');
            }
          }
        ]
    });

    await alert.present();

    const { data } = await alert.onDidDismiss();
  }

  async deleteList(id) {
    var header, subtitle, confirmMessage, confirmButton, cancelButton;
    
    this.translate.stream('page4.alerts.8.header').subscribe((res: string) => {
      header = res;
    });
    this.translate.stream('page4.alerts.8.subtitle').subscribe((res: string) => {
      subtitle = res;
    });
    this.translate.stream('page4.alerts.8.confirmMessage').subscribe((res: string) => {
      confirmMessage = res;
    });
    this.translate.stream('page4.confirmButton').subscribe((res: string) => {
      confirmButton = res;
    });
    this.translate.stream('page4.cancelButton').subscribe((res: string) => {
      cancelButton = res;
    });
    
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subtitle,
      buttons:[
        {
          text: cancelButton,
          role: 'cancel',
          cssClass: 'danger'
        },
        {
          text: confirmButton,
          handler: () => {
            this.idioma.deleteList(id);
            this.modalCtrl.dismiss();
            this.toast(header, confirmMessage, 'success');
          }
        }
      ]
    });

    await alert.present();

    const { data } = await alert.onDidDismiss();
  }
}
