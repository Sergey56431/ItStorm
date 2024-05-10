import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionMaxLength'
})
export class DescriptionMaxLengthPipe implements PipeTransform {

  transform(value: string, maxLength: number = 200): string {
    if (value && value.length > maxLength) {
      value = value.substring(0, maxLength) + '...';
    }
    return value;
  }

}
