import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { LanguageService } from '../../services/language.service';
import { Articulo } from '../../models/articulo.model';
import { Page4 } from '../../models/page4.model';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.scss'],
})
export class ArticulosPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  data: any; // nombre del header
  articulos: Articulo[]; // arreglo incompleto a mostrar
  artiFake: Articulo[]; // arreglo con todos los articulos
  length: number; // longitud del arreglo
  id: any; // id de categoria
  id2: any; // id de subcategoria
  textos: Page4; //textos adicionales de la pagina
  textoBuscar = '' // variable del searchbar a buscar
  
  constructor(private idioma: LanguageService,
              private route: ActivatedRoute,
              private alertController: AlertController) { }

  ngOnInit() {
    // obtener id de categoria y subcategoria
    this.id = this.route.snapshot.paramMap.get('id');
    this.id2 = this.route.snapshot.paramMap.get('id2');

    //obtener nombre del header
    this.data = this.idioma.getPage2().categories[this.id].subcategories[this.id2].name;

    // obtener textos adicionales de alerts
    this.textos = this.idioma.getPage4();

    this.articulos = this.idioma.getArticles(this.id, this.id2);

    // obtenemos los articulos, dimensión y los odenamos
    // this.artiFake = this.idioma.getArticles(this.id, this.id2);
    // this.artiFake = this.artiFake.sort();
    // this.length = this.artiFake.length;

    // // guardamos los valores a mostrar en una variable volatil
    // // para despues almacenarlo en el original y quitarlo del que no es
    // const flag = this.artiFake.slice(0, 20);
    // this.articulos = flag;
    // this.artiFake = this.artiFake.slice(21);
  }

  loadData(event) {
    setTimeout(() => {
      // si ya no hay mas elementos
      if (this.articulos.length === this.length) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }
      // agregamos otros 20 elementos mas al arreglo
      const add = this.artiFake.slice(0, 20)
      this.artiFake = this.artiFake.slice(21);
      this.articulos.push(... add);
      event.target.complete();
    }, 1000);


  }

  async alert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.textos.alerts[0].header,
      subHeader: this.textos.alerts[0].subtitle,
      buttons: [
        {
          text: this.textos.cancelButton,
          role: 'cancel',
          cssClass: 'danger'
        },
        {
          text: this.textos.confirmButton,
          handler: () => {

          }
        }
      ],
      inputs: [
        {
          name: 'list',
          type: 'text',
          placeholder: this.textos.alerts[0].placeholder
        }
      ]
    });

    await alert.present();
  }

  buscar(evento) {
    this.textoBuscar = evento.detail.value;
  }
}
