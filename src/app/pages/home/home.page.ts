import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { LanguageService } from '../../services/language.service';
import { ConfigModalPage } from '../config-modal/config-modal.page';
import { Lista } from '../../models/lista.model';
import { ListModalPage } from '../list-modal/list-modal.page';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit{
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('card', { static: false }) card: ElementRef;
  listas: Lista[];
  animate: Animation

  constructor(private idioma: LanguageService,
              private modalCtrl: ModalController,
              private animationCtrl: AnimationController) {}

  ngOnInit(): void {  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.listas = this.idioma.getLists();
    this.idioma.getDarkMode();
    this.idioma.setAppLanguage(this.idioma.getApp().language);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.animate = this.animationCtrl.create('animation');
    this.animate.addElement(this.card.nativeElement)
    .duration(1500)
    .easing('ease-out')
    .fromTo('transform', 'translateX(100%)', 'translateX(0%)')
    .fromTo('opacity', 0, 1);

    this.animate.play();
  }

  async abrirConfig() {
    const modal = await this.modalCtrl.create({
      component: ConfigModalPage
    });

    await modal.present();
  }

  async abrirLista(lista: Lista) {
    const modal = await this.modalCtrl.create({
      component: ListModalPage,
      componentProps: {
        listaPrev: lista,
        isEdit: true
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
  }
}
