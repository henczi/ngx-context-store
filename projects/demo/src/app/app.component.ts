import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';

  counter$ = timer(0, 1000);
  lazyValue = 0;
  incrementLazyValue = () => {
    this.lazyValue++;
  }

}
