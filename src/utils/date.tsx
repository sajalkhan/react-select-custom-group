import React from 'react';
import { utcToZonedTime, format } from 'date-fns-tz';
export interface DateProps {
  date: string;
  noDay?: true;
  noTime?: true;
  timeZone: string;
}

const normalFormat = 'yyyy/MM/dd HH:mm(EEEEEE)';
const noDayFormat = 'yyyy/MM/dd HH:mm';
const noTimeFormat = 'yyyy/MM/dd';

const formatDate = (date: string): string => {
  const tempMonth = date.match(/-\d{1}-/);
  if (tempMonth && tempMonth[0].length === 3) {
    date = date.replace(/-/, '-0');
  }

  const regExp = new RegExp(':\\d{3,}', 'g');
  const tempData = date.match(regExp);
  if (tempData) {
    date = date.replace(regExp, tempData[0].replace(':', '.'));
  }

  return (date += 'Z');
};

export const Date: React.FC<DateProps> = ({ date, timeZone, noDay, noTime }) => {
  const zonedDate = utcToZonedTime(formatDate(date), timeZone);

  if (noTime) {
    return <>{date !== '-' ? format(zonedDate, noTimeFormat) : '-'}</>;
  }
  return <>{date !== '-' ? format(zonedDate, noDay ? noDayFormat : normalFormat) : '-'}</>;
};
