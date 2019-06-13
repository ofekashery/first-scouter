import { Component } from '@angular/core';
import { periods } from '../../../environments/form-fields';

@Component({
  selector: 'scouter-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent {

  periods: any[];

  constructor() {
    periods.forEach(period => {
      period.fields.forEach(field => field.type = field.constructor.name)
    });
    this.periods = periods;
    console.log(periods)
  }
}
