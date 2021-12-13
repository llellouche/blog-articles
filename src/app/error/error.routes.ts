import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { Error404Component } from './error404.component';

export const errorRoutes: Routes = [
  { path: '404', component: Error404Component },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forChild(errorRoutes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule {}
