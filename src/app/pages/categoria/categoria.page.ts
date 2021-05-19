import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { LanguageService } from '../../services/language.service';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  data: string; // titulo del header
  catFake: Categoria[]; // arreglo incompleto a mostrar
  categorias: Categoria[]; // arreglo con todos las categorias
  length: number; // longitud del arreglo

  constructor(private idioma: LanguageService) { }

  ngOnInit() {
    this.data = this.idioma.getPage2().name;
    this.categorias = this.idioma.getCategoria();

    // obtenemos los articulos, dimensión y los odenamos
    this.catFake = this.idioma.getCategoria();
    this.catFake = this.catFake.sort();
    this.length = this.catFake.length;

    // guardamos los valores a mostrar en una variable volatil
    // para despues almacenarlo en el original y quitarlo del que no es
    const flag = this.catFake.slice(0, 10);
    this.categorias = flag;
    this.catFake = this.catFake.slice(11);
  }
  
  loadData(event) {
    setTimeout(() => {
      // si ya no hay mas elementos
      if (this.categorias.length === this.length) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }
      // agregamos otros 10 elementos mas al arreglo
      const add = this.catFake.slice(0, 10)
      this.catFake = this.catFake.slice(11);
      this.categorias.push(... add);
      event.target.complete();
    }, 1000);
  }
}
