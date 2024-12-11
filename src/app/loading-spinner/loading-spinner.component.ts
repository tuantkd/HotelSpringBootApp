import { Component } from '@angular/core';
import { LoadingService } from '../services/common/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  loading$ = this._loadingService.loading$;
  constructor(private readonly _loadingService: LoadingService) {}
}
