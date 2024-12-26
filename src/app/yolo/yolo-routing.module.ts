import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YoloPage } from './yolo.page';

const routes: Routes = [
  {
    path: '',
    component: YoloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoloPageRoutingModule {}
