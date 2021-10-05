import { Injectable } from '@angular/core';
import { App } from '../models/app.model';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { Lista } from '../models/lista.model';
import { Router } from '@angular/router';
import { ArticuloLista } from '../models/artLista.model';
import { TranslateService } from '@ngx-translate/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Injectable({
  providedIn: 'root'
})
export class LanguageService{
app: App = { language: 1, darkMode: false, tutorial: true };
list: Lista[] = [];

    constructor(private file: File,
                private plt: Platform,
                private route: Router,
                private translate: TranslateService,
                private splashScreen: SplashScreen,
                private screenOrientation: ScreenOrientation) {  }

    setAppLanguage(i: number){
        switch (i) {
            case 0:
                this.translate.use('spanish');
                this.app.language = 0;
                break;
        
            case 1:
                this.translate.use('english');
                this.app.language = 1;
                break;

            case 2:
                this.translate.use('french');
                this.app.language = 2;
                break;
        }
    }

    getLists () {
        return this.list;
    }

    getApp() {
        return this.app;
    }

    setApp(app: App) {
        this.app = app;
        this.file.writeExistingFile(this.file.dataDirectory, 'app.json', JSON.stringify(this.app))
        .then(res => {
            console.log('si guardo el app.json');
        })
        .catch(err => {
            console.log('No pudo guardarse el app.json', err);
        });
    }

    changeData(value, file) {
        // si hay una carpeta sobreescribe en el archivo existente de configuracion
        this.file.writeExistingFile(this.file.dataDirectory + 'data/', file, JSON.stringify(value))
        .then(res => {
            this.readFile(file);
        })
        // ver error al escribir archivo de configuracion existente
        .catch(err => {
            console.log('Error de escribir archivo existente', err);
            return;
        });
    }

    loadData() {
        this.plt.ready()
        .then(() => {
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
            this.file.listDir(this.file.dataDirectory, 'data')
            .then(res => {
                this.readFile('app.json');
                this.readFile('list.json');
                this.route.navigateByUrl('/home');
                this.splashScreen.hide();
            })
            .catch(err => {
                // crea una carpeta con el nombre data
                this.file.createDir(this.file.dataDirectory, 'data', false)
                .then(res => {
                    this.writeFile('app.json', JSON.stringify(this.app));
                    this.writeFile('list.json', JSON.stringify(this.list));
                    this.route.navigateByUrl('/intro');
                    // this.splashScreen.hide();
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
            if (file === 'app.json') {
                this.app = JSON.parse(res);
            }
            else if (file === 'list.json') {
                this.list = JSON.parse(res);
            }
            this.splashScreen.hide();
        })
        .catch(error => {
            console.log('Error al leer el archivo ' + file , error);
        });
    }

    writeFile(file, data) {
        // crea un nuevo archivo de configuracion
        this.file.writeFile(this.file.dataDirectory + 'data/', file, data)
        .then(res => {
            this.readFile(file);
        })
        // si no pudo cargar el archivo
        .catch(err => {
            console.log('Error de escribir nuevo archivo', err);
        });
    }

    getDarkMode() {
        if (this.app.darkMode === true) {
            document.body.setAttribute('color-theme', 'dark');
        }
        else {
            document.body.setAttribute('color-theme', 'light');
        }
    }

    writeList (listation: Lista) {
        if (listation.listId === this.list.length) {
            this.list.push(listation);
        }
        else {
            for (let i = 0; i < listation.articles.length; i++) {
                this.list[listation.listId].articles.find((a: ArticuloLista) => {
                    if (a.artId === listation.articles[i].artId || a.name === listation.articles[i].name) {
                        a = listation.articles[i]
                        const y = listation.articles[i].artId
                        listation.articles.splice(y, 1);
                    }
                });
            }
            for (let i = 0; i < listation.articles.length; i++) {
                this.list[listation.listId].articles.push(listation.articles[i]);
            }
        }
        
        this.file.writeExistingFile(this.file.dataDirectory + 'data/', 'list.json', JSON.stringify(this.list))
        .then(res => {
            this.route.navigateByUrl('/home');
        })
        .catch(err => {
            console.log('Error al escribir lista', err);
        });
    }

    deleteItem(list: Lista) {
        this.list[list.listId] = list;
    
        this.file.writeExistingFile(this.file.dataDirectory + 'data/', 'list.json', JSON.stringify(this.list))
        .then(res => {
            this.route.navigateByUrl('/home');
        })
        .catch(err => {
            console.log('Error al escribir lista', err);
        });
    }

    deleteList(list: number) {
        this.list.splice(list, 1);

        this.file.writeExistingFile(this.file.dataDirectory + 'data/', 'list.json', JSON.stringify(this.list))
        .then(res => {
            this.route.navigateByUrl('/home');
        })
        .catch(err => {
            console.log('Error al escribir lista', err);
        });
    }
}
