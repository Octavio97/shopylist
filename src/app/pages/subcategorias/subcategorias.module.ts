import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubcategoriasPageRoutingModule } from './subcategorias-routing.module';

import { SubcategoriasPage } from './subcategorias.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubcategoriasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SubcategoriasPage]
})
export class SubcategoriasPageModule {}
