import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'progressclass'})
export class ProgressClassPipe implements PipeTransform {
  transform(value: number): string {

    if (value > 85) {
        return "bg-danger"
    } else
    if (value > 60) {
        return "bg-warning"
    } else {
        return "bg-info"
    }
  }
}