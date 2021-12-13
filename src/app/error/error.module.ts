import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

// Component
import {Error404Component} from './error404.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [Error404Component],
  exports: [Error404Component]
})
export class ErrorModule {
}
