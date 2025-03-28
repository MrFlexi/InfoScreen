import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { DatePipe } from '@angular/common';
import '@ui5/webcomponents/dist/Button.js';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [DatePipe]
})
export class AppComponent {
  constructor() {}
}
