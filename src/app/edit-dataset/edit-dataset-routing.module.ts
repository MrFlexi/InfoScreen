import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDatasetPage } from './edit-dataset.page';

const routes: Routes = [
  {
    path: '',
    component: EditDatasetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDatasetPageRoutingModule {}
