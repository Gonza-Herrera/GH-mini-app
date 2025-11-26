import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { isLoading } from '../interceptors/loading.interceptor';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, NgIf, MatProgressBarModule],
  template: `
    <mat-progress-bar *ngIf="busy()" mode="indeterminate" aria-label="Cargando"></mat-progress-bar>
    <router-outlet />
  `
})
export class AppShellComponent {
  busy = computed(() => isLoading() > 0);
}
