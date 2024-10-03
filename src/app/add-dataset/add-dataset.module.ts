import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDatasetPageRoutingModule } from './add-dataset-routing.module';

import { AddDatasetPage } from './add-dataset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDatasetPageRoutingModule
  ],
  declarations: [AddDatasetPage]
})
export class AddDatasetPageModule {}
