import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticulosPageRoutingModule } from './articulos-routing.module';

import { ArticulosPage } from './articulos.page';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticulosPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [ArticulosPage]
})
export class ArticulosPageModule {}
