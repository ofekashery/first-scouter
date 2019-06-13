import { Component } from '@angular/core';
import { periods } from '../../../environments/form-fields';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'scouter-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent {

  periods: any[];
  match: any;
  team: number;
  form: FormGroup;

  constructor(private router: Router) {
    if (!sessionStorage.getItem('Match') || !sessionStorage.getItem('Team')) {
      this.router.navigateByUrl('home');
      return;
    }
    this.match = JSON.parse(sessionStorage.getItem('Match'));
    this.team = parseInt(sessionStorage.getItem('Team'));
    const group: any = {};

    periods.forEach(period => {
      period.fields.forEach(field => {
        field.type = field.constructor.name;
        field.key = (period.title + '-' + field.constructor.name + '-' + field.title).toLowerCase().replace(/ /g, '-');
        group[field.key] = new FormControl(field.defaultValue);
      });
    });

    this.form = new FormGroup(group);
    this.periods = periods;
  }
}
