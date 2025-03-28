import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ui5TabPageRoutingModule } from './ui5-tab-routing.module';

import { Ui5TabPage } from './ui5-tab.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ui5TabPageRoutingModule
  ],
  declarations: [Ui5TabPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Ui5TabPageModule {}
