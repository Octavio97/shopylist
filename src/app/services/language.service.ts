import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import spanish from 'src/assets/texts/spanish.json';
import english from 'src/assets/texts/english.json';
import french from 'src/assets/texts/french.json';
import { App } from '../models/app.model';
import config from 'src/app/app.json'
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class LanguageService{

idioma: any;
app: App;

  constructor(private http: HttpClient, private file: File) { }

    setData(i){
        switch (i) {
            case 0:
                this.idioma = spanish;
                this.app.language = 0;
                break;
        
            case 1:
                this.idioma = english;
                this.app.language = 1;
                break;

            case 2: 
                this.idioma = french;
                this.app.language = 2;
                break;
        }
    }
    
    getData() {
        return this.idioma;
    }

    getLanguage() {
        return this.idioma[2].settings[0].languages;
    }

    getCategoria() {
        return this.idioma[1].categories;
    }
    
    getSubcategories(id: any) {
        return this.idioma[1].categories[id].subcategories;
    }

    getArticles(id1: any, id2: any) {
        return this.idioma[1].categories[id1].subcategories[id2].articles;
    }

    getPage1() {
        return this.idioma[0];
    }

    getPage2() {
        return this.idioma[1];
    }

    getPage3() {
        return this.idioma[2];
    }

    getPage4() {
        return this.idioma[3];
    }

    getLists () {
        
    }

    getApp() {
        return this.app;
    }

    setApp() {
        this.app = config;
    }

    setDarkMode(value: boolean) {
        if (value === true) {
            console.log(this.file.dataDirectory);
            this.file.writeFile(this.file.dataDirectory, 'test.json', 'holapapu', {replace: true})
            .then(_ => console.log('Directory exists'))
            .catch(err => console.log('Directory doesn\'t exist'));
        }
        else {
            console.log(this.file.dataDirectory);
            this.file.writeFile(this.file.dataDirectory, 'test.json', 'holapapu', {replace: true})
            .then(_ => console.log('Directory exists'))
            .catch(err => console.log('Directory doesn\'t exist'));
        }
    }
}
