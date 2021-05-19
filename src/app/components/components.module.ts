import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { ReturnButtonComponent } from './return-button/return-button.component';

@NgModule({
  declarations: [
    HeaderComponent,
    InfiniteScrollComponent,
    ReturnButtonComponent
  ],
  exports: [
    HeaderComponent,
    InfiniteScrollComponent,
    ReturnButtonComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
