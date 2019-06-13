import * as fetch from 'node-fetch';
import { environment as Config } from '../environments/environment';

const compLevelsNames = {
  'qm': 'Quals',
  'ef': 'Octos',
  'qf': 'Quarters',
  'sf': 'Semis',
  'f': 'Finals'
};
const compLevelsFullNames = {
  'qm': 'Qualifications',
  'ef': 'Octo-finals',
  'qf': 'Quarterfinals',
  'sf': 'Semifinals',
  'f': 'Finals'
};
const compLevelsPlayOrder = {
  'qm': 1,
  'ef': 2,
  'qf': 3,
  'sf': 4,
  'f': 5
};

export default async function() {
  const event = {
    'name': 'Unknown Event',
    'matches': []
  };
  if (Config.program && Config.program.toUpperCase() === 'FTC') {
    const toa = await theOrangeAlliance('/matches');
    toa.sort((a, b) => {
      const tournamentLevel1 = a.tournament_level;
      const tournamentLevel2 = b.tournament_level;
      const matchNumber1 = parseInt(a.match_key.split('-')[3].substring(1, 4));
      const matchNumber2 = parseInt(b.match_key.split('-')[3].substring(1, 4));

      if (tournamentLevel1 == tournamentLevel2) {
        return matchNumber1 < matchNumber2 ? -1 : 1;
      } else if (tournamentLevel1 === 4) {
        return 1;
      } else if (tournamentLevel2 === 4) {
        return -1;
      } else {
        return tournamentLevel1 < tournamentLevel2 ? -1 : 1;
      }
    });

    for (const match of toa) {
      const tournamentLevel = match.tournament_level;
      let comp_level = 'qm';
      if (tournamentLevel > 20 && tournamentLevel < 30) {
        comp_level = 'qf';
      } else if (tournamentLevel > 30) {
        comp_level = 'sf';
      } else if (tournamentLevel === 4) {
        comp_level = 'f';
      }

      event.matches.push({
        'key': match.match_key,
        'name': match.match_name,
        'comp_level': compLevelsFullNames[comp_level],
        'red_teams': match.participants.filter((participant) => participant.station < 20).map((team) => team.team_key),
        'blue_teams': match.participants.filter((participant) => participant.station > 20).map((team) => team.team_key)
      })
    }
  } else if (Config.program && Config.program.toUpperCase() === 'FRC') {
    const tba = await theBlueAlliance('/matches');
    tba.sort((a, b) => {
      const playOrder1 = compLevelsPlayOrder[a.comp_level] * 1000000 + a.match_number * 1000 + a.set_number;
      const playOrder2 = compLevelsPlayOrder[b.comp_level] * 1000000 + b.match_number * 1000 + b.set_number;
      return playOrder1 - playOrder2;
    });

    for (const match of tba) {
      event.matches.push({
        'key': match.key,
        'name': match.comp_level === 'qm' ? `Quals ${match.match_number}` : `${compLevelsNames[match.comp_level]} ${match.set_number} Match ${match.match_number}`,
        'comp_level': compLevelsFullNames[match.comp_level],
        'red_teams': match.alliances.red.team_keys.map((key) => key.toLowerCase().replace('frc', '')),
        'blue_teams': match.alliances.blue.team_keys.map((key) => key.toLowerCase().replace('frc', ''))
      })
    }
    event.matches.sort((a, b) => a.play_order - b.play_order);
  }
  return event;
}

function theOrangeAlliance(route) {
  return fetch(`https://theorangealliance.org/api/event/${Config.event_key}${route}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-TOA-Key': Config.auth_key,
      'X-Application-Origin': 'FIRST Scouter App'
    }
  }).then(res => res.json()).catch((error) => {
    console.log(error);
    return null;
  });
}

function theBlueAlliance(route) {
  return fetch(`https://www.thebluealliance.com/api/v3/event/${Config.event_key}${route}`, {
    method: 'GET',
    headers: {
      'X-TBA-Auth-Key': Config.auth_key
    }
  }).then(res => res.json()).catch((error) => {
    console.log(error);
    return null;
  });
}
