import { Component } from '@angular/core';
import { periods } from '../../../environments/form-fields';
import {Router} from "@angular/router";

@Component({
  selector: 'scouter-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent {

  periods: any[];
  match: any;
  team: number;

  constructor(private router: Router) {
    if (!sessionStorage.getItem('Match') || !sessionStorage.getItem('Team')) {
      this.router.navigateByUrl('home');
      return;
    }
    this.match = JSON.parse(sessionStorage.getItem('Match'));
    this.team = parseInt(sessionStorage.getItem('Team'));

    periods.forEach(period => {
      period.fields.forEach(field => field.type = field.constructor.name)
    });
    this.periods = periods;
    console.log(periods)
  }
}
