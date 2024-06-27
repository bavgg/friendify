import moment from 'moment';


export function timeNow() {
  const now = moment().toISOString();
  return now;
}

