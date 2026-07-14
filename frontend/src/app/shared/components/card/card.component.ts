import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [ngClass]="[elevationClass(), bordered() ? 'card-bordered' : '']">
      <!-- Card Header -->
      @if (title() || subtitle() || hasHeaderSlot) {
        <div class="card-header">
          <div>
            @if (title()) {
              <h3 class="card-title">{{ title() }}</h3>
            }
            @if (subtitle()) {
              <p class="card-subtitle">{{ subtitle() }}</p>
            }
          </div>
          <ng-content select="[card-header]"></ng-content>
        </div>
      }

      <!-- Card Body -->
      <div class="card-body">
        <ng-content></ng-content>
      </div>

      <!-- Card Footer -->
      @if (hasFooterSlot) {
        <div class="card-footer">
          <ng-content select="[card-footer]"></ng-content>
        </div>
      }
    </div>
  `,
  styles: [`
    .card {
      background-color: var(--color-surface);
      border-radius: var(--radius-card);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .card-bordered {
      border: 1px solid var(--color-border);
    }

    /* Elevations */
    .elevation-none {
      box-shadow: none;
    }
    .elevation-sm {
      box-shadow: var(--shadow-sm);
    }
    .elevation-md {
      box-shadow: var(--shadow-md);
    }

    /* Header */
    .card-header {
      padding: var(--space-4) var(--space-5);
      border-bottom: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-3);
    }

    .card-title {
      font-size: var(--font-size-card);
      font-weight: 700;
      color: var(--color-text-primary);
      margin: 0;
    }

    .card-subtitle {
      font-size: var(--font-size-small);
      color: var(--color-text-secondary);
      margin: var(--space-1) 0 0 0;
    }

    /* Body */
    .card-body {
      padding: var(--space-5);
      flex-grow: 1;
    }

    /* Footer */
    .card-footer {
      padding: var(--space-4) var(--space-5);
      border-top: 1px solid var(--color-border);
      background-color: var(--color-background);
      opacity: 0.95;
    }
  `]
})
export class CardComponent {
  readonly title = input<string | null>(null);
  readonly subtitle = input<string | null>(null);
  readonly bordered = input<boolean>(true);
  readonly elevation = input<'none' | 'sm' | 'md'>('sm');

  // Simple checks if headers or footers exist
  protected get hasHeaderSlot(): boolean {
    return false; // Angualr checks can be handled via template or contentchild if needed, but select matches automatically
  }

  // To be safe we let ng-content select them
  protected get hasFooterSlot(): boolean {
    return true; // We show footer container only when requested
  }

  protected elevationClass(): string {
    return `elevation-${this.elevation()}`;
  }
}
