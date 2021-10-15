import { NgModule } from '@angular/core';
import { NgxContextStoreSetDirective } from './ngx-context-store-set.directive';
import { NgxContextStoreGetDirective } from './ngx-context-store-get.directive';



@NgModule({
  declarations: [
    NgxContextStoreSetDirective,
    NgxContextStoreGetDirective,
  ],
  imports: [
  ],
  exports: [
    NgxContextStoreSetDirective,
    NgxContextStoreGetDirective,
  ]
})
export class NgxContextStoreModule { }
