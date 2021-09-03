import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Lista } from 'src/app/models/lista.model';
import { ListModalPage } from '../list-modal/list-modal.page';
import { ArticuloLista } from '../../models/artLista.model';
import { Dimensiones } from '../../models/dimensiones.model';
import { App } from 'src/app/models/app.model';
import { LanguageService } from '../../services/language.service';
import { Dinero } from '../../models/dinero.model';

@Component({
  selector: 'app-new-article-modal',
  templateUrl: './new-article-modal.page.html',
  styleUrls: ['./new-article-modal.page.scss'],
})
export class NewArticleModalPage implements OnInit {
  @Input() listas: Lista[];
  @Input() articulos: ArticuloLista[];
  @Input() other: boolean;
  listaTemp: Lista;
  app: App;

  constructor(private modalCtrl: ModalController,
              private translate: TranslateService,
              private alertController: AlertController,
              private toastCtlr: ToastController,
              private idioma: LanguageService) { }

  ngOnInit() { this.app = this.idioma.getApp(); }

  cerrarConfig() {
    this.modalCtrl.dismiss();
  }

  // muestra alerta para una nueva lista
  async newListAlert(newArticle: boolean) {
    var header1, subtitle1, header2, subtitle2, header3, subtitle3, placeholder, cancelButton, confirmButton;

      this.translate.stream('page4.alerts.0.header').subscribe((res: string) => { 
        header1 = res;
      });

      this.translate.stream('page4.alerts.0.subtitle').subscribe((res: string) => { 
        subtitle1 = res;
      });

      this.translate.stream('page4.alerts.7.header').subscribe((res: string) => { 
        header2 = res;
      });

      this.translate.stream('page4.alerts.7.subtitle').subscribe((res: string) => { 
        subtitle2 = res;
      });

      this.translate.stream('page4.alerts.3.header').subscribe((res: string) => { 
        header3 = res;
      });

      this.translate.stream('page4.alerts.3.subtitle').subscribe((res: string) => { 
        subtitle3 = res;
      });

      this.translate.stream('page4.alerts.0.placeholder').subscribe((res: string) => { 
        placeholder = res;
      });

      this.translate.stream('page4.cancelButton').subscribe((res: string) => { 
        cancelButton = res;
      });

      this.translate.stream('page4.confirmButton').subscribe((res: string) => { 
        confirmButton = res;
      });

      const alert = await this.alertController.create({
        header: header1,
        subHeader: subtitle1,
        buttons: [
          {
            text: cancelButton,
            role: 'cancel',
            cssClass: 'danger',
            handler: () => {
              this.alertController.dismiss();
            }
          },
          {
            text: confirmButton,
            handler: (value) => {
              // aqui se escribe la nueva lista
              if (value.list !== '') { // si la lista tiene un nombre
                for (let index = 0; index < this.listas.length; index++) {
                  if (this.listas[index].name === value.list) { // si ya existe una lista con ese nombre
                    this.toast(header2, subtitle2, 'danger');
                    this.alertController.dismiss();
                    return;
                  }
                }
                // cuando se trate de afregar un nuevo articulo
                if (newArticle === true) {
                  this.defineVolume(value.list, this.listas.length);
                }
                // cuando se trate de agregar articulos predefinidos
                else {
                  this.verListaPrev(this.articulos, value.list, this.listas.length);
                  this.modalCtrl.dismiss();
                }
                
                this.alertController.dismiss();
              }
              else { // si no tiene nombre
                this.toast(header3, subtitle3, 'danger');
                this.alertController.dismiss();
                return;
              }
            }
          }
        ],
        inputs: [
          {
            name: 'list',
            type: 'text',
            placeholder: placeholder
          }
        ]
      });
  
      await alert.present(); 

      const { data } = await alert.onDidDismiss(); 
  }

  // ver toast dependiendo las acciones
  async toast(header, message, colors) {
    const toast = await this.toastCtlr.create({
      header: header,
      message: message,
      duration: 3000,
      animated: true,
      translucent: true,
      color: colors
    });

    await toast.present();

    const { data } = await toast.onDidDismiss();
  }

  // ver formulario con los articulos seleccionados e ingresar cantidades y precios
  async verListaPrev(articles, name, id) {
    const listaPrev: Lista = {
      listId: id,
      name: name,
      articles: articles
    };

    const modal = await this.modalCtrl.create({
      component: ListModalPage,
      componentProps: {
        listaPrev: listaPrev,
        isEdit: false
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
  }

  // buscar articulos repetidos en la lista a agregar
  findArticlesInList(lista: Lista) {
    if (this.articulos.length === 0) {
      var header, subtitle;

      this.translate.stream('page4.alerts.2.header').subscribe((res: string) => { 
        header = res;
      });

      this.translate.stream('page4.alerts.2.subtitle').subscribe((res: string) => { 
        subtitle = res;
      });

      this.toast(header, subtitle, 'danger');
    } else {
      let toast = false;
        for (let x = 0; x < this.articulos.length; x++) {
          const index = lista.articles.indexOf(this.articulos[x]);
          if (index !== -1) {
            this.articulos[x] = lista.articles[index];
            toast = true;
          }
        }
        this.verListaPrev(this.articulos, lista.name, lista.listId);
        this.modalCtrl.dismiss();

        if (toast === true) {
          var header, subtitle;

          this.translate.stream('page4.alerts.5.header').subscribe((res: string) => { 
            header = res;
          });

          this.translate.stream('page4.alerts.5.subtitle').subscribe((res: string) => { 
            subtitle = res;
          });

          this.toast(header, subtitle, 'warning');
        }
    }
  }

  // define si estamos en estado de agregar nuevo articulo o ya tenemos articulos previos
  define(nuevo: boolean, list?: Lista) {
    // cuando se trate de articulos predefinidos
    if (this.other === false) {
      if (nuevo === true) {
        this.newListAlert(false);
      }
      else {
        this.findArticlesInList(list);
      }
    }
    // cuandos se agregue un nuevo articulo
    else {
      if (nuevo === true) {
        this.newListAlert(true);
      }
      else {
        this.listaTemp = list;
        this.defineVolume(list.name, list.listId);
      }
    }
  }
  
  async defineVolume(name: string, id: number) {
    var cancelButton, confirmButton, subHeader, unidad, longitud, peso, volumen;

    this.translate.stream('page4.cancelButton').subscribe((res: string) => {
      cancelButton = res;
    });

    this.translate.stream('page4.confirmButton').subscribe((res: string) => {
      confirmButton = res;
    });

    this.translate.stream('page4.alerts.12.subtitle').subscribe((res: string) => {
      unidad = res;
    });

    this.translate.stream('page4.alerts.12.header').subscribe((res: string) => {
      longitud = res;
    });

    this.translate.stream('page4.alerts.11.header').subscribe((res: string) => {
      peso = res;
    });

    this.translate.stream('page2.categories.0.subcategories.2.articles.0.typeAmount').subscribe((res: string) => {
      volumen = res;
    });

    this.translate.stream('page4.alerts.13.header').subscribe((res: string) => {
      subHeader = res;
    });

    const alert = await this.alertController.create({
      header: name,
      subHeader: subHeader,
      inputs: [
        {
          name: unidad,
          type: 'radio',
          value: 'unidad',
          label: unidad
        },
        {
          name: longitud,
          type: 'radio',
          value: 'longitud',
          label: longitud
        },
        {
          name: peso,
          type: 'radio',
          value: 'peso',
          label: peso
        }
      ],
      buttons: [
        {
          text: cancelButton,
          role: 'cancel',
          handler: () => {
            this.alertController.dismiss();
          }
        },
        {
          text: confirmButton,
          handler: (value) => {
            if (value === undefined) {
              this.defineVolume(name, id);
            }
            else {
              var array: Array<Dimensiones>;

              this.translate.stream('page3.settings.4.dimensions').subscribe((res: Dimensiones[]) => {
                array = res
              });

              var articles: ArticuloLista = new ArticuloLista();
              articles.typeAmount = value;
              switch (value) {
                case 'peso':
                  this.defineMeasure(array.slice(0, 4), articles, name, id);
                  break;
                
                case 'longitud':
                  this.defineMeasure(array.slice(4, 6), articles, name, id);
                  break;

                case 'unidad':
                  articles.nameAmount = array[6].dimensionId;
                  this.defineMoney(articles, name, id);
                  break;
              }
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async defineMeasure(dims: Dimensiones[], articles: ArticuloLista, name: string, id: number) {
    var cancelButton, confirmButton, subHeader, inputs = [];

    this.translate.stream('page4.cancelButton').subscribe((res: string) => {
      cancelButton = res;
    });

    this.translate.stream('page4.confirmButton').subscribe((res: string) => {
      confirmButton = res;
    });

    this.translate.stream('page4.alerts.13.subtitle').subscribe((res: string) => {
      subHeader = res;
    });

    for (let i = 0; i < dims.length; i++) {
      inputs.push({
        name: dims[i].name,
        type: 'radio',
        value: dims[i].dimensionId,
        label: dims[i].name
      });
    }

    const alert = await this.alertController.create({
      header: name,
      subHeader: subHeader,
      inputs: inputs,
      buttons: [
        {  
          text: cancelButton,
          handler: () => {
            this.alertController.dismiss();
          }
        },
        {
          text: confirmButton,
          handler: (value) => {
            if (value === undefined) {
              this.defineMeasure(dims, articles, name, id);
            }
            else {
              articles.nameAmount = value;
              this.defineMoney(articles, name, id);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async defineMoney(articles: ArticuloLista, name: string, id: number) {
    var cancelButton, confirmButton, subHeader, inputs = [], dinero: Dinero[] = [];

    this.translate.stream('page4.cancelButton').subscribe((res: string) => {
      cancelButton = res;
    });

    this.translate.stream('page4.confirmButton').subscribe((res: string) => {
      confirmButton = res;
    });

    this.translate.stream('page3.settings.3.money').subscribe((money: Dinero[]) => {
      dinero = money;
    });

    this.translate.stream('page4.alerts.13.placeholder').subscribe((res: string) => {
      subHeader = res;
    });

    for (let i = 0; i < dinero.length; i++) {
      inputs.push(
        {
          name: dinero[i].name,
          type: 'radio',
          value: dinero[i].moneyId,
          label: dinero[i].name
        }
      );
    }

    const alert = await this.alertController.create({
      header: name,
      subHeader: subHeader,
      inputs: inputs,
      buttons: [
        {
          text: cancelButton,
          role: 'cancel',
          handler: () => {
            this.alertController.dismiss();
          }
        },
        {
          text: confirmButton,
          handler: (value) => {
            if (value === undefined) {
              this.defineMoney(articles, name, id);
            }
            else {
              articles.typePrice = value;
              this.newArticle(articles, name, id);
            }
            
          }
        }
      ]
    });

    await alert.present();
  }

  async newArticle(articles: ArticuloLista, name: string, id: number) {
    var header, header2, subtitle2, subHeader, cancelButton, confirmButton, p1, p2, p3, p4, p5;

    this.translate.stream('page4.alerts.10.header').subscribe((res: string) => {
      header = res;
    });

    this.translate.stream('page4.alerts.10.subtitle').subscribe((res: string) => {
      subHeader = res;
    });

    this.translate.stream('page4.cancelButton').subscribe((res: string) => {
      cancelButton = res;
    });

    this.translate.stream('page4.confirmButton').subscribe((res: string) => {
      confirmButton = res;
    });

    this.translate.stream('page4.alerts.11.subtitle').subscribe((res: string) => {
      p2 = res;
    });

    this.translate.stream('page4.alerts.0.placeholder').subscribe((res: string) => {
      p3 = res;
    });

    this.translate.stream('page4.alerts.12.header').subscribe((res: string) => {
      p4 = res;
    });

    this.translate.stream('page4.alerts.12.subtitle').subscribe((res: string) => {
      p5 = res;
    });

    this.translate.stream('page4.alerts.6.header').subscribe((res: string) => {
      header2 = res;
    });
    this.translate.stream('page4.alerts.6.subtitle').subscribe((res: string) => {
      subtitle2 = res;
    });

    if (articles.typeAmount === 'peso' || articles.typeAmount === 'volumen') {
      this.translate.stream('page4.alerts.11.header').subscribe((res: string) => {
        p1 = res;
      });
    }
    else if (articles.typeAmount === 'longitud') {
      this.translate.stream('page4.alerts.12.header').subscribe((res: string) => {
        p1 = res;
      });
    }
    else if (articles.typeAmount === 'unidad') {
      this.translate.stream('page4.alerts.12.subtitle').subscribe((res: string) => {
        p1 = res;
      });
    }
    
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: p3
        },
        {
          name: 'peso',
          type: 'number',
          placeholder: p1
        },
        {
          name: 'precio',
          type: 'number',
          placeholder: p2,
        }
      ],
      buttons: [
        {
          text: cancelButton,
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            this.alertController.dismiss();
          }
        },
        {
          text: confirmButton,
          handler: (value) => {
            console.log(value);
            if (value.nombre === '' || value.precio === '' || value.peso === '') {
              this.newArticle(articles, name, id);
            }
            else {
              articles.name = value.nombre;
              articles.price = value.precio;
              articles.amount = value.peso;
              articles.image = false;
              
              var arreglo: Lista = {
                listId: id,
                name: name,
                articles: [articles]
              }

              this.idioma.writeList(arreglo);
              this.toast(header2, subtitle2, 'success');
              this.modalCtrl.dismiss();
            }
          }
        }
      ]
    });

    await alert.present();

    const { data } = await alert.onWillDismiss();
  }
}
