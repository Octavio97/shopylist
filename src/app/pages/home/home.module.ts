import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { ConfigModalPage } from '../config-modal/config-modal.page';
import { ConfigModalPageModule } from '../config-modal/config-modal.module';
import { ListModalPageModule } from '../list-modal/list-modal.module';
import { TranslateModule } from '@ngx-translate/core';
import { ListModalPage } from '../list-modal/list-modal.page';


@NgModule({
  entryComponents: [
    ConfigModalPage,
    ListModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule,
    ConfigModalPageModule,
    ListModalPageModule,
    TranslateModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
