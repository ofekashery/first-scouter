import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { mergeMap, startWith } from 'rxjs/operators';
import fetchEvent from '../../fetch-event';

@Component({
  selector: 'scouter-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  eventName: string;
  form: FormGroup = this.formBuilder.group({
    selectMatch: '',
  });
  matches: any[] = [];
  filteredMatches: Observable<any[]>;
  selectedMatch: any = null;

  constructor(private formBuilder: FormBuilder) {
    this.getGroupedMatches().then((result) => {
      this.matches = result;
    });
  }

  ngOnInit() {
    this.filteredMatches = this.form.get('selectMatch')!.valueChanges
      .pipe(
        startWith(''),
        mergeMap(async value => this.filterMatches(value))
      );
  }

  filterMatches(value: string): any[] {
    console.log(value)
    const allMatches = [].concat.apply([], (this.matches || []).map(list => list.matches));
    const match = allMatches.filter(match => match.name.toLowerCase() === (value || '').toLowerCase());
    this.selectedMatch = match.length > 0 ? match[0] : null;
    console.log('selectedMatch', this.selectedMatch);

    if (value) {
      const filterValue = (value || '').toString().toLowerCase();
      return JSON.parse(JSON.stringify(this.matches)).map(list => {
        list.matches = list.matches.filter(match => match.name.toLowerCase().includes(filterValue));
        return list;
      }).filter(list => list.matches.length > 0);
    }
    return this.matches;
  }

  getGroupedMatches() {
    return fetchEvent().then((event) => {
      const grouped = event.matches.reduce(function (r, a) {
        const key = a.comp_level || 'Others';
        r[key] = r[key] || [];
        r[key].push(a);
        return r;
      }, Object.create(null));

      const result = [];
      for (const key of Object.keys(grouped)) {
        result.push({ name: key, matches: grouped[key]})
      }
      const COMP_LEVELS_PLAY_ORDER = {
        'Qualifications': 1,
        'Octo-finals': 2,
        'Quarterfinals': 3,
        'Semifinals': 4,
        'Finals': 5,
      };
      result.sort((a, b) => {
        return COMP_LEVELS_PLAY_ORDER[a.matches[0].comp_level] -COMP_LEVELS_PLAY_ORDER[b.matches[0].comp_level];
      });
      console.log(result);
      return result;
    });
  }
}
