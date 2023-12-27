import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dual-listbox',
  templateUrl: './dual-listbox.component.html',
  styleUrls: ['./dual-listbox.component.scss']
})
export class DualListboxComponent {
  @Input() leftItems: any[] = [];
  @Input() rightItems: any[] = [];
  @Input() leftHeader: string = "";
  @Input() rightHeader: string = "";

  @Output() itemsMoved: EventEmitter<any> = new EventEmitter();

  selectedLeftItems: any[] = [];
  selectedRightItems: any[] = [];

  selectItem(item: any, side: 'left' | 'right') {
    if (side === 'left') {
      this.toggleSelection(item, this.selectedLeftItems);
    } else {
      this.toggleSelection(item, this.selectedRightItems);
    }
  }

  moveSelected(direction: 'left' | 'right') {
    if (direction === 'left') {
      this.leftItems.push(...this.selectedRightItems);
      this.rightItems = this.rightItems.filter(item => !this.selectedRightItems.includes(item));
      this.selectedRightItems = [];
    } else {
      this.rightItems.push(...this.selectedLeftItems);
      this.leftItems = this.leftItems.filter(item => !this.selectedLeftItems.includes(item));
      this.selectedLeftItems = [];
    }
    this.itemsMoved.emit({ left: this.leftItems, right: this.rightItems });
  }

  moveItemOnDoubleClick(item: any, target: 'left' | 'right') {
    if (target === 'left') {
      this.leftItems.push(item);
      this.rightItems = this.rightItems.filter(i => i !== item);
    } else {
      this.rightItems.push(item);
      this.leftItems = this.leftItems.filter(i => i !== item);
    }
    this.itemsMoved.emit({ left: this.leftItems, right: this.rightItems });
  }

  private toggleSelection(item: any, selectedItems: any[]) {
    const index = selectedItems.indexOf(item);
    if (index > -1) {
      selectedItems.splice(index, 1); // Deselect
    } else {
      selectedItems.push(item); // Select
    }
  }
}
