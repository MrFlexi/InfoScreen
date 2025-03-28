import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Ui5TabPage } from './ui5-tab.page';


const routes: Routes = [
  {
    path: '',
    component: Ui5TabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ui5TabPageRoutingModule {}
