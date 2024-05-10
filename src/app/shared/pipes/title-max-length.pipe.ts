import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleMaxLength'
})
export class TitleMaxLengthPipe implements PipeTransform {

  transform(value: string, maxLength: number = 80): string {
    if (value && value.length > maxLength) {
      value = value.substring(0, maxLength) + '...';
    }
    return value;
  }

}
