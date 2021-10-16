import { Component } from '@angular/core';

@Component({
  selector: 'app-lazy',
  template: `
    <h1 *getContext="let lazy = lazy">Lazy component: {{lazy}}</h1>
    <button *getContext="let incLazy = incLazy;let lazy = lazy" (click)="incLazy()">Increment ({{lazy}})</button>
  `,
  styles: ['']
})
export class LazyComponent {
}
