import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, ModalController, AnimationController, Animation } from '@ionic/angular';
import { LanguageService } from '../../services/language.service';
import { Articulo } from '../../models/articulo.model';
import { Page4 } from '../../models/page4.model';
import { Lista } from '../../models/lista.model';
import { ListModalPage } from '../list-modal/list-modal.page';
import { ArticuloLista } from '../../models/artLista.model';
import { TranslateService } from '@ngx-translate/core';
import { NewArticleModalPage } from '../new-article-modal/new-article-modal.page';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.scss'],
})
export class ArticulosPage implements OnInit {
  id: any; // id de categoria
  id2: any; // id de subcategoria
  textoBuscar = '' // variable del searchbar a buscar
  listas: Lista[]; // lista
  articulosPrev: ArticuloLista[] = []; // arreglo de articulos para guardar
  animate: Animation;
  @ViewChild('card', { static: false }) card: ElementRef;

  constructor(private idioma: LanguageService,
              private route: ActivatedRoute,
              private modalCtlr: ModalController,
              private toastCtlr: ToastController,
              private animationCtrl: AnimationController,
              private translate: TranslateService) {}

  ngOnInit() {
    // obtener id de categoria y subcategoria
    this.id = this.route.snapshot.paramMap.get('id');
    this.id2 = this.route.snapshot.paramMap.get('id2');
    
    // obtener listas guardadas
    this.listas = this.idioma.getLists();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.animaciones();
  }

  async animaciones() {
    this.animate = this.animationCtrl.create('animation');
    this.animate.addElement(this.card.nativeElement)
    .duration(1500)
    .easing('ease-out')
    .fromTo('transform', 'translateX(100%)', 'translateX(0%)')
    .fromTo('opacity', 0, 1);

    await this.animate.play();
  }
// // muestra alerta para una nueva lista
//   async newListAlert() {
//     if (this.articulosPrev.length === 0) {
//       var header, subtitle;

//       this.translate. stream('page4.alerts.2.header').subscribe((res: string) => { 
//         header = res;
//       });

//       this.translate.stream('page4.alerts.2.subtitle').subscribe((res: string) => { 
//         subtitle = res;
//       });

//       this.toast(header, subtitle, 'danger');
//     } else {
//       var header1, subtitle1, header2, subtitle2, header3, subtitle3, placeholder, cancelButton, confirmButton;

//       this.translate.stream('page4.alerts.0.header').subscribe((res: string) => { 
//         header1 = res;
//       });

//       this.translate.stream('page4.alerts.0.subtitle').subscribe((res: string) => { 
//         subtitle1 = res;
//       });

//       this.translate.stream('page4.alerts.7.header').subscribe((res: string) => { 
//         header2 = res;
//       });

//       this.translate.stream('page4.alerts.7.subtitle').subscribe((res: string) => { 
//         subtitle2 = res;
//       });

//       this.translate.stream('page4.alerts.3.header').subscribe((res: string) => { 
//         header3 = res;
//       });

//       this.translate.stream('page4.alerts.3.subtitle').subscribe((res: string) => { 
//         subtitle3 = res;
//       });

//       this.translate.stream('page4.alerts.0.placeholder').subscribe((res: string) => { 
//         placeholder = res;
//       });

//       this.translate.stream('page4.cancelButton').subscribe((res: string) => { 
//         cancelButton = res;
//       });

//       this.translate.stream('page4.confirmButton').subscribe((res: string) => { 
//         confirmButton = res;
//       });

//       const alert = await this.alertController.create({
//         cssClass: 'my-custom-class',
//         header: header1,
//         subHeader: subtitle1,
//         buttons: [
//           {
//             text: cancelButton,
//             role: 'cancel',
//             cssClass: 'danger',
//             handler: () => {
//               this.alertController.dismiss();
//             }
//           },
//           {
//             text: confirmButton,
//             handler: (value) => {
//               // aqui se escribe la nueva lista
//               if (value.list !== '') { // si la lista tiene un nombre
//                 for (let index = 0; index < this.listas.length; index++) {
//                   if (this.listas[index].name === value.list) { // si ya existe una lista con ese nombre
//                     this.toast(header2, subtitle2, 'danger');
//                     this.alertController.dismiss();
//                     return;
//                   }
//                 }

//                 this.verListaPrev(this.articulosPrev, value.list, this.listas.length);
//                 this.alertController.dismiss();
//               }
//               else { // si no tiene nombre
//                 this.toast(header3, subtitle3, 'danger');
//                 this.alertController.dismiss();
//                 return;
//               }
//             }
//           }
//         ],
//         inputs: [
//           {
//             name: 'list',
//             type: 'text',
//             placeholder: placeholder
//           }
//         ]
//       });
  
//       await alert.present(); 

//       const { data } = await alert.onDidDismiss(); 
//     }
//   }
// busta elemento del searchbox
  buscar(evento) {
    this.textoBuscar = evento.detail.value;
  }
// metodo para guardar articulos a la lista
  datosLista(evento, item) {
    if (evento.detail.checked) {
      const art: ArticuloLista = {
          artId: item.artId,
          catId: this.id,
          subId: this.id2,
          typeAmount: item.typeAmount,
          nameAmount: item.nameAmount,
          price: null,
          amount: null,
          typePrice: null,
          image: true
      }
      this.articulosPrev.push(art);
    } else if (!evento.detail.checked) {
      this.articulosPrev.splice(this.articulosPrev.indexOf(item), 1);
    }
  }
// // buscar articulos repetidos en la lista a agregar
//   findArticlesInList(lista: Lista) {
//     if (this.articulosPrev.length === 0) {
//       var header, subtitle;

//       this.translate.stream('page4.alerts.2.header').subscribe((res: string) => { 
//         header = res;
//       });

//       this.translate.stream('page4.alerts.2.subtitle').subscribe((res: string) => { 
//         subtitle = res;
//       });

//       this.toast(header, subtitle, 'danger');
//     } else {
//       let toast = false;
//         for (let x = 0; x < this.articulosPrev.length; x++) {
//           const index = lista.articles.indexOf(this.articulosPrev[x]);
//           if (index !== -1) {
//             this.articulosPrev[x] = lista.articles[index];
//             toast = true;
//           }
//         }
//         this.verListaPrev(this.articulosPrev, lista.name, lista.listId);

//         if (toast === true) {
//           var header, subtitle;

//           this.translate.stream('page4.alerts.5.header').subscribe((res: string) => { 
//             header = res;
//           });

//           this.translate.stream('page4.alerts.5.subtitle').subscribe((res: string) => { 
//             subtitle = res;
//           });

//           this.toast(header, subtitle, 'warning');
//         }
//     }
//   }
// // ver formulario con los articulos seleccionados e ingresar cantidades y precios
//   async verListaPrev(articles, name, id) {

//     const listaPrev: Lista = {
//       listId: id,
//       name: name,
//       articles: articles
//     };

//     const modal = await this.modalCtlr.create({
//       component: ListModalPage,
//       componentProps: {
//         listaPrev: listaPrev,
//         isEdit: false
//       }
//     });

//     await modal.present();

//     const { data } = await modal.onDidDismiss();
//   }
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

  // Ir al modal de listas
  async listModal() {
    if (this.articulosPrev.length === 0) {
      var header, subtitle;

      this.translate. stream('page4.alerts.2.header').subscribe((res: string) => { 
        header = res;
      });

      this.translate.stream('page4.alerts.2.subtitle').subscribe((res: string) => { 
        subtitle = res;
      });

      this.toast(header, subtitle, 'danger');
      return;
    }
    const modal = await this.modalCtlr.create({
      component: NewArticleModalPage,
      componentProps: {
        listas: this.listas,
        articulos: this.articulosPrev,
        other: false
      }
    });

    await modal.present();
  }
}
