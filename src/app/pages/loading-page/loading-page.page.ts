import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.page.html',
  styleUrls: ['./loading-page.page.scss'],
})
export class LoadingPagePage implements OnInit {

  constructor(private idioma: LanguageService, private route: Router, private translate: TranslateService) {
    this.translate.setDefaultLang('english');
    this.translate.use('english');
  }

  ngOnInit() {
    setTimeout(() => {
      this.idioma.loadData();
    }, 4000);
  }
  
  // ngDoCheck(): void {
  //   if (this.idioma.getApp().tutorial === true) {
  //     console.log('Directo a tutorial');
  //     this.route.navigateByUrl('/intro');
  //   }
  //   else if(this.idioma.getApp().tutorial === false) {
  //     console.log('Directo a home');
  //     this.route.navigateByUrl('/home');
  //   }
  // }

  // ngAfterContentInit(): void {
  //   this.app = this.idioma.getApp();
  //   console.log('ngAfterContentInit()', this.app);
  // }

  // ngAfterContentChecked(): void {
  //   if (this.idioma.getApp().tutorial === true) {
  //     console.log('Directo a tutorial');
  //   }
  //   else {
  //     console.log('Directo a home');
  //   }
  // }
  
  // ngAfterViewInit(): void {
  //   this.app = this.idioma.getApp();
  //   console.log('ngAfterViewInit()', this.app);
  // }
  
  ngAfterViewChecked(): void {
    // if (this.idioma.getApp().tutorial === true) {
    //   console.log('Directo a tutorial');
    //   this.route.navigateByUrl('/intro');
    // }
    // else if(this.idioma.getApp().tutorial === false) {
    //   console.log('Directo a home');
    //   this.route.navigateByUrl('/home');
    // }
  }

  // ionViewWillEnter() {
  //   this.app = this.idioma.getApp();
  //   console.log('ionViewWillEnter', this.app);
  // }

}
