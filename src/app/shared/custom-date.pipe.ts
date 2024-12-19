import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: string, format: string = 'dd-MM-yyyy'): Date | null {
    if (!value) {
      return null;
    }

    const parts = value.split('-');
    if (parts.length !== 3) {
      return null;
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based in JavaScript
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
  }

}
