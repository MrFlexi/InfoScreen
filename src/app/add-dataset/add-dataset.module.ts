import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDatasetPageRoutingModule } from './add-dataset-routing.module';

import { AddDatasetPage } from './add-dataset.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDatasetPageRoutingModule
  ],
  declarations: [AddDatasetPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddDatasetPageModule {}
