import { zonedTimeToUtc, format, utcToZonedTime } from 'date-fns-tz';
import { TIME_ZONE } from './common';

export const getZonedDatetime = () => zonedTimeToUtc(new Date(), TIME_ZONE);

export const formatIsoDate = (date: Date | string): string => {
  return format(utcToZonedTime(date, 'UTC'), 'yyyy-MM-dd HH:mm:ss.SSS z');
};
