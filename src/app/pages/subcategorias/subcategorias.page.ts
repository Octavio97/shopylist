import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { Subcategoria } from '../../models/subcategoria.model';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.page.html',
  styleUrls: ['./subcategorias.page.scss'],
})
export class SubcategoriasPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  data: any; // texto del header
  id: any; // id de la categoria
  subcategorias: Subcategoria[]; //arreglo de subcategorias incompleto
  subFake: Subcategoria[]; // arreglo completo de subcategorias
  length: number; // longitud del arreglo

  constructor(private idioma: LanguageService , private route: ActivatedRoute) { }

  ngOnInit() {
    // obtener id de categoria
    this.id = this.route.snapshot.paramMap.get('id');
    this.data = this.idioma.getPage2().categories[this.id].name;

    // obtenemos las subcategorias, dimensión y los odenamos
    this.subFake = this.idioma.getSubcategories(this.id);
    this.subFake = this.subFake.sort();
    this.length = this.subFake.length;
    
    // guardamos los valores a mostrar en una variable volatil
    // para despues almacenarlo en el original y quitarlo del que no es
    const flag = this.subFake.slice(0, 10);
    this.subcategorias = flag;
    this.subFake = this.subFake.slice(11);
  }

  loadData(event) {
    setTimeout(() => {
      // si ya no hay mas elementos
      if (this.subcategorias.length === this.length) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }
      // agregamos otros 10 elementos mas al arreglo
      const add = this.subFake.slice(0, 10);
      this.subFake = this.subFake.slice(11);
      this.subcategorias.push(... add);
      event.target.complete();
    }, 1000);
  }
}
