import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kFormatter'
})
export class KFormatterPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) {
      return '0';
    }

    if (value >= 1000 && value < 1000000) {
      return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'K'; // Converts 1000 -> 1K, 1100 -> 1.1K
    }

    return value.toString();
  }
}
