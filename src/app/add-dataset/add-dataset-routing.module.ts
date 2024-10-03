import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDatasetPage } from './add-dataset.page';

const routes: Routes = [
  {
    path: '',
    component: AddDatasetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDatasetPageRoutingModule {}
