// kebab-case.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'countryName',
})
export class CountryNamePipe implements PipeTransform {
  transform(value: string): string | undefined {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    if (value) {
      if (value === 'XW') {
        return 'World';
      }
      return regionNames.of(value);
    } else {
      return '';
    }
  }
}
