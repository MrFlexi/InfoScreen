import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditWebcamsPage } from './edit-webcams.page';

const routes: Routes = [
  {
    path: '',
    component: EditWebcamsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditWebcamsPageRoutingModule {}
