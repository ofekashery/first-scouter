import { Component } from '@angular/core';
import { periods } from '../../../environments/form-fields';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import * as fetch from 'node-fetch';

@Component({
  selector: 'scouter-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent {

  periods: any[];
  match: any;
  team: number;
  alliance: string = '';
  form: FormGroup;
  allFields: any[] = [];

  constructor(private router: Router) {
    if (!sessionStorage.getItem('Match') || !sessionStorage.getItem('Team')) {
      this.router.navigateByUrl('home');
      return;
    }
    this.match = JSON.parse(sessionStorage.getItem('Match'));
    this.team = parseInt(sessionStorage.getItem('Team'));
    const group: any = {};

    if (this.match.red_teams.includes(this.team)) {
      this.alliance = 'red'
    } else {
      this.alliance = 'blue'
    }

    periods.forEach(period => {
      period.fields.forEach(field => {
        field.type = field.constructor.name;
        field.key = (period.title + '-' + field.constructor.name + '-' + field.title).toLowerCase().replace(/ /g, '-');
        group[field.key] = new FormControl(field.defaultValue);
        this.allFields.push(field);
      });
    });

    this.form = new FormGroup(group);
    this.periods = periods;
  }

  sendForm() {
    if (confirm(`Are you sure to send this ${this.match.name} scouting about team #${this.team}?`)) {
      const values: any = this.form.value;
      console.log(values);
      const result = {
        'header': [],
        'row': []
      };
      result.header.push('Timestamp');
      const pad = (n) => n <= 9 ? '0' + n : n.toString();
      const date = new Date();
      result.row.push(pad(date.getDate()) + '/' + pad(date.getMonth() + 1) + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds()));

      result.header.push('Match');
      result.row.push(this.match.name);

      result.header.push('Team');
      result.row.push(this.team);

      for (const field of this.allFields) {
        let value = values[field.key];
        if (value && (value.toString() === 'true' || value.toString() === 'false')) {
          value = value ? 'Yes' : 'No';
        }
        result.header.push(field.title);
        result.row.push(value);
      }

      fetch(environment.sheet_app_url, {
        method: 'POST',
        body: JSON.stringify(result)
      }).then(() => {
        this.router.navigateByUrl('home');
        localStorage.removeItem('Match');
        localStorage.removeItem('Team');
      }).catch(() => {
        alert('Oops! Cannot send you form. Please check you connection and try again.')
      });
    }
  }
}
