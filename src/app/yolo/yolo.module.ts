import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YoloPageRoutingModule } from './yolo-routing.module';

import { YoloPage } from './yolo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YoloPageRoutingModule
  ],
  declarations: [YoloPage]
})
export class YoloPageModule {}
