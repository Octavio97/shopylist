import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubcategoriasPageRoutingModule } from './subcategorias-routing.module';

import { SubcategoriasPage } from './subcategorias.page';
import { ComponentsModule } from '../../components/components.module';
import { ConfigModalPageModule } from '../config-modal/config-modal.module';
import { ConfigModalPage } from '../config-modal/config-modal.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  entryComponents: [
    ConfigModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubcategoriasPageRoutingModule,
    ComponentsModule,
    ConfigModalPageModule,
    TranslateModule
  ],
  declarations: [SubcategoriasPage]
})
export class SubcategoriasPageModule {}
