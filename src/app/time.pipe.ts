import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(value: number): string {
    const date = dayjs.utc(value);
    const showHours = date.hour() > 0;
    return date.format(showHours ? 'HH:mm:ss' : 'mm:ss');
  }
}
