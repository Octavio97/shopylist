import { Component } from '@angular/core';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(private idioma: LanguageService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // ingresamos configuracion guardada
    this.idioma.setApp();
    // ponemos el idioma guardado en el archivo config
    this.idioma.setData(this.idioma.getApp().language); 
  }
}
