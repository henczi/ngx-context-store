import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxContextStoreModule } from 'ngx-context-store';
import { LazyComponent } from './lazy.component';

@NgModule({
  declarations: [
    LazyComponent
  ],
  imports: [
    CommonModule,
    NgxContextStoreModule,
    RouterModule.forChild([
      { path: '', component: LazyComponent }
    ])
  ],
})
export class LazyModule { }
