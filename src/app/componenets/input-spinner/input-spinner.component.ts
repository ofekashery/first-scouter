import { Component, Input } from '@angular/core';

@Component({
  selector: 'scouter-input-spinner',
  templateUrl: './input-spinner.component.html',
  styleUrls: ['./input-spinner.component.scss']
})

export class InputSpinnerComponent {
  @Input() title: string;
  @Input() min: number = 0;
  @Input() max: number;
  count: number = this.min;

  increment() {
    if (!this.max || this.count < this.max) {
      this.count++;
    }
  }

  decrement() {
    if (this.count > this.min) {
      this.count--;
    }
  }
}
