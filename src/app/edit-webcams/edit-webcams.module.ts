import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditWebcamsPageRoutingModule } from './edit-webcams-routing.module';

import { EditWebcamsPage } from './edit-webcams.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditWebcamsPageRoutingModule
  ],
  declarations: [EditWebcamsPage]
})
export class EditWebcamsPageModule {}
