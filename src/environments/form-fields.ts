import { Checkbox, NumberField, Period, Selector, Textarea } from '../app/fields';

export const periods = [
  new Period('Sandstorm', [
    new Selector('Starting location', [
      'HAB Level 1',
      'HAB Level 2',
      'Unknown'
    ]),
    new Checkbox('Successfully crossed HAB line'),
    new Textarea('Performance'),
  ]),
  new Period('Teleop', [
    new NumberField('Panels on Cargo Ship', 0),
    new NumberField('Panels on low Rocket Hatches', 0),
    new NumberField('Panels on middle/high Rocket Hatches', 0),
    new NumberField('Cargo in Cargo Ship', 0),
    new NumberField('Cargo in low Rocket Bays', 0),
    new NumberField('Cargo in middle/high Rocket Bays', 0)
  ]),
  new Period('Endgaame', [
    new Selector('Endgame location', [
      'HAB Level 1',
      'HAB Level 2',
      'HAB Level 3',
      'Not on HAB'
    ])
  ])
];
