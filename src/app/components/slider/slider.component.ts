import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  demo: number = 0;
  val = 50;
  min = 0;
  max = 100;

  constructor() { }
}
