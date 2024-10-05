import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDatasetPageRoutingModule } from './edit-dataset-routing.module';

import { EditDatasetPage } from './edit-dataset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDatasetPageRoutingModule
  ],
  declarations: [EditDatasetPage]
})
export class EditDatasetPageModule {}
