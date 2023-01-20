export default function serializer(param: string | null) {
  if (typeof param === 'string') {
    return param;
  }
  if (typeof param === 'object') {
    return JSON.stringify(param);
  }
}
