import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController, Animation, ModalController } from '@ionic/angular';
import { NewArticleModalPage } from '../new-article-modal/new-article-modal.page';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {
  animate: Animation;
  @ViewChild('card', { static: false }) card: ElementRef;

  constructor(private animationCtrl: AnimationController, private modalCtrl: ModalController, private idioma: LanguageService) {  }

  ngOnInit() {  }

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

  async verifyOtherArticle() {
    const modal = await this.modalCtrl.create({
      component: NewArticleModalPage,
      componentProps: {
        listas: this.idioma.getLists(),
        other: true
      }
    });

    return await modal.present();

    const { data } = await modal.onWillDismiss();
  }
}
