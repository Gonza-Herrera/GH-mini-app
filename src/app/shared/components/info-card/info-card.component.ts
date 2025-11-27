import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

type CardItem = { icon?: string; text: string };

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
  host: {
    class: 'info-card',
    '[attr.tabindex]': 'tabIndex',
    '[attr.role]': 'role',
    '[attr.aria-label]': 'ariaLabel || title',
    '(click)': 'handleClick()',
    '(keydown.enter)': 'handleClick()',
  },
})
export class InfoCardComponent {
  @Input() title = '';
  @Input() items: CardItem[] = [];
  @Input() tabIndex = 0;
  @Input() ariaLabel?: string;
  @Input() role: 'listitem' | 'article' = 'listitem';
  @Input() clickable = true;

  @Output() selected = new EventEmitter<void>();

  handleClick() {
    if (this.clickable) {
      this.selected.emit();
    }
  }
}
