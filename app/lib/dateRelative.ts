import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

export default function distanceToNow(dateTime: string) {
  const dateTimeObj = new Date(dateTime);
  return formatDistanceToNowStrict(dateTimeObj, {
    addSuffix: true,
  });
}
