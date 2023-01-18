import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

export default function distanceToNow(dateTime: string | number) {
  const dateTimeObj = new Date(dateTime);
  return formatDistanceToNowStrict(dateTimeObj, {
    addSuffix: true,
  });
}
