import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxContextStoreModule } from 'ngx-context-store';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxContextStoreModule,
    RouterModule.forRoot([
      { path: '', loadChildren: () => import('./lazy/lazy.module').then(x => x.LazyModule) }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
