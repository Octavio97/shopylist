import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ArticulosPageRoutingModule } from './articulos-routing.module';
import { ArticulosPage } from './articulos.page';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ListModalPageModule } from '../list-modal/list-modal.module';
import { ConfigModalPageModule } from '../config-modal/config-modal.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticulosPageRoutingModule,
    ComponentsModule,
    PipesModule,
    ListModalPageModule,
    ConfigModalPageModule,
    TranslateModule
  ],
  declarations: [ArticulosPage]
})
export class ArticulosPageModule {}
