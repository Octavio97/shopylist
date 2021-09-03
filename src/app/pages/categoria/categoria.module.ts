import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaPageRoutingModule } from './categoria-routing.module';

import { CategoriaPage } from './categoria.page';
import { ComponentsModule } from '../../components/components.module';
import { ConfigModalPage } from '../config-modal/config-modal.page';
import { ConfigModalPageModule } from '../config-modal/config-modal.module';
import { TranslateModule } from '@ngx-translate/core';
import { NewArticleModalPage } from '../new-article-modal/new-article-modal.page';
import { NewArticleModalPageModule } from '../new-article-modal/new-article-modal.module';

@NgModule({
  entryComponents: [
    ConfigModalPage,
    NewArticleModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaPageRoutingModule,
    ComponentsModule,
    ConfigModalPageModule,
    NewArticleModalPageModule,
    TranslateModule
  ],
  declarations: [CategoriaPage]
})
export class CategoriaPageModule {}
