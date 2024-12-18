import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {
  color = 'primary';
  mode:any = 'determinate';
  value = 50;
  bufferValue = 75;

}
