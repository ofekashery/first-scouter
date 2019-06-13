import { Component, forwardRef, Input, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'scouter-input-spinner',
  templateUrl: './input-spinner.component.html',
  styleUrls: ['./input-spinner.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputSpinnerComponent), multi: true }
  ]
})
export class InputSpinnerComponent implements ControlValueAccessor, OnChanges {

  @Input() title: string;
  @Input() min: number = 0;
  @Input() max: number;
  count: number = this.min;

  onChange: any = () => { };
  onTouched: any = () => { };

  get counterValue() {
    return this.count;
  }

  set counterValue(val) {
    this.count = val;
    this.onChange(val);
  }

  ngOnChanges(inputs) {
    this.onChange(this.counterValue);
  }

  writeValue(value) {
    if (value) {
      this.counterValue = value;
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  increment() {
    if (!this.max || this.counterValue < this.max) {
      this.counterValue++;
    }
  }

  decrement() {
    if (this.counterValue > this.min) {
      this.counterValue--;
    }
  }
}
