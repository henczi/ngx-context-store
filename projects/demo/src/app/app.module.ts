import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxContextStoreModule } from 'ngx-context-store';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxContextStoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
