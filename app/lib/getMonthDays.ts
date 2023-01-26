import moment from 'moment';

export default function* getMonthDays(today: string) {
  let first = today;
  let last;
  while (true) {
    last = moment(first)
      .add(1, 'months')
      .add(1, 'day')
      .toISOString()
      .slice(0, 10);
    yield { first, last };
    first = moment(first)
      .add(-1, 'months')
      .add(1, 'day')
      .toISOString()
      .slice(0, 10);
  }
}
