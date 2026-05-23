import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="spinner-overlay" *ngIf="loadingService.isLoading()">
      <div class="spinner-container">
        <mat-spinner color="primary" [diameter]="60"></mat-spinner>
        <p class="loading-text">Loading, please wait...</p>
      </div>
    </div>
  `,
  styles: [`
    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 14, 23, 0.8);
      backdrop-filter: blur(8px);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
    .loading-text {
      color: var(--text-primary);
      font-size: 1.1rem;
      font-weight: 500;
      letter-spacing: 0.5px;
      animation: pulse 1.5s infinite ease-in-out;
    }
  `]
})
export class SpinnerComponent {
  loadingService = inject(LoadingService);
}
