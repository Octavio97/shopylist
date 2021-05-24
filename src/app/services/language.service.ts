import { Injectable } from '@angular/core';
import spanish from 'src/assets/texts/spanish.json';
import english from 'src/assets/texts/english.json';
import french from 'src/assets/texts/french.json';
import { App } from '../models/app.model';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LanguageService{

idioma: any;
app: App;
  constructor(private file: File, private plt: Platform, ) { this.file = new File(); this.app = { language: 0, darkMode: true };}

    setAppLanguage(i: number){
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
    
    getAppLanguage() {
        return this.idioma;
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
        this.file.readAsText(this.file.dataDirectory + 'data/', 'list.json')
        .then(res => {
            this.app = JSON.parse(res);
        })
        .catch(error => {
            console.log('Error al leer archivo', error)
        });
    }

    getApp() {
        return this.app;
    }

    // setApp() {
    //     this.app = config;
    // }

    changeData(value: App) {
        // si hay una carpeta sobreescribe en el archivo existente de configuracion
        this.file.writeExistingFile(this.file.dataDirectory + 'data/', 'app.json', JSON.stringify(value))
        .then(res => {
            this.loadData();
        })
        // ver error al escribir archivo de configuracion existente
        .catch(err => {
            console.log('Error de escribir archivo existente', err);
        });
    }

    loadData() {
        this.plt.ready()
        .then(() => {
            this.file.listDir(this.file.dataDirectory, 'data')
            .then(res => {
                this.readFile('app.json');
            })
            .catch(err => {
                // crea una carpeta con el nombre data
                this.file.createDir(this.file.dataDirectory, 'data', false)
                .then(res => {
                   this.writeFile('app.json');
                })
                // error al crear directorio
                .catch(err => {
                    console.log('Error al crear directorio', err);
                });
            });
        })
        .catch(err => {
            console.log('Error al cargar plataforma', err);
        });
    }

    readFile(file) {
        this.file.readAsText(this.file.dataDirectory + 'data/', file)
        .then(res => {
            this.app = JSON.parse(res);
        })
        .catch(error => {
            this.writeFile('app.json');
        });
    }

    writeFile(file) {
        // crea un nuevo archivo de configuracion
        this.file.writeFile(this.file.dataDirectory + 'data/', file, '{ language: 0, darkMode: true }')
        .then(res => {
            this.readFile('app.json');
        })
        // si no pudo cargar el archivo
        .catch(err => {
            console.log('Error de escribir nuevo archivo', err);
        });
    }

    getLanguage() {
        return this.idioma[2].settings[0].languages;
    }

    getCategoria() {
        return this.idioma[1].categories;
    }
}
