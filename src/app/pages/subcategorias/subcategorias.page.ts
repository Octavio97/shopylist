import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationController, Animation } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.page.html',
  styleUrls: ['./subcategorias.page.scss'],
})
export class SubcategoriasPage implements OnInit {
  id: any; // id de la categoria
  animate: Animation;
  @ViewChild('card', { static: false }) card: ElementRef;

  constructor(private route: ActivatedRoute,
              private animationCtrl: AnimationController) {  }

  ngOnInit() {
   this.init();
  }

  init() {
    // obtener id de categoria
    this.id = this.route.snapshot.paramMap.get('id');
  }

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
}
