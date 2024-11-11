import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { DatePipe } from '@angular/common';

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
