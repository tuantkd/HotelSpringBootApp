import { Component } from '@angular/core';

@Component({
  selector: 'app-snipper',
  templateUrl: './progress-snipper.component.html',
  styleUrls: ['./progress-snipper.component.scss']
})
export class ProgressSnipperComponent {
  color = 'warn';
  mode: any = 'determinate';
  value: any = 50;
}
