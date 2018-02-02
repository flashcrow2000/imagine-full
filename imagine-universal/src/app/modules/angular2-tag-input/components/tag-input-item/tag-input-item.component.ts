import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'rl-tag-input-item',
  template: `
    {{text}}
    <span
    class="ng2-tag-input-remove"
    (click)="removeTag()">&times;</span>
  `,
  styleUrls: ['./tag-input-item.component.css'],
})
export class TagInputItemComponent {
  @Input() selected: boolean;
  @Input() text: string;
  @Input() index: number;
  @Output() tagRemoved: EventEmitter<number> = new EventEmitter<number>();
  @HostBinding('class.ng2-tag-input-item-selected') get isSelected() { return !!this.selected; }

  constructor() { }

  removeTag(): void {
    this.tagRemoved.emit(this.index);
  }
}
