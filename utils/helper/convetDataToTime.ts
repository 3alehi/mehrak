import { format } from 'date-fns-jalali';

export function convertToJalali(inputDatetime: string): string {
  const date = new Date(inputDatetime);

  const jalaliDate = format(date, 'yyyy/MM/dd');

  const localDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Tehran' }));
  const hours = localDate.getHours();
  const minutes = localDate.getMinutes();

  const jalaliMonths = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
  const [jYear, jMonth, jDay] = jalaliDate.split('/').map(Number);

  return `${jDay} ${jalaliMonths[jMonth - 1]} ${jYear} - ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
} 