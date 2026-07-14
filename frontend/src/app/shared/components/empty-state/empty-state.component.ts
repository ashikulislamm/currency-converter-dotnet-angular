import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  template: `
    <div class="empty-state">
      <div class="icon-container">
        <svg [lucideIcon]="icon()" class="empty-icon"></svg>
      </div>
      <h3 class="empty-title">{{ title() }}</h3>
      @if (description()) {
        <p class="empty-description">{{ description() }}</p>
      }
      <div class="empty-actions">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: var(--space-6) var(--space-4);
      background-color: var(--color-surface);
      border: 1px dashed var(--color-border);
      border-radius: var(--radius-card);
      max-width: 480px;
      margin: 0 auto;
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: var(--color-background);
      margin-bottom: var(--space-4);
    }

    .empty-icon {
      width: 24px;
      height: 24px;
      color: var(--color-text-secondary);
    }

    .empty-title {
      font-size: var(--font-size-card);
      font-weight: 700;
      color: var(--color-text-primary);
      margin: 0 0 var(--space-2) 0;
    }

    .empty-description {
      font-size: var(--font-size-small);
      color: var(--color-text-secondary);
      max-width: 320px;
      margin: 0 0 var(--space-4) 0;
      line-height: 1.5;
    }

    .empty-actions {
      display: flex;
      gap: var(--space-2);
    }
  `]
})
export class EmptyStateComponent {
  readonly title = input<string>('No data found');
  readonly description = input<string | null>(null);
  readonly icon = input<string>('info');
}
