import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-dataset',
    loadChildren: () => import('./add-dataset/add-dataset.module').then( m => m.AddDatasetPageModule)
  },
  {
    path: 'edit-dataset/:id',
    loadChildren: () => import('./edit-dataset/edit-dataset.module').then( m => m.EditDatasetPageModule)
  },
  {
    path: 'edit-webcams',
    loadChildren: () => import('./edit-webcams/edit-webcams.module').then( m => m.EditWebcamsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
