import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timeback'})
export class TimeBackPipe implements PipeTransform {
  transform(value: number): string {

    var result = "Давно";
    if (value < 1) {
        result = "< 1 сек"
    } else
    if (value < 2) {
        result = "< 2 сек"
    } else
    if (value < 3) {
        result = "< 3 сек"
    } else
    if (value < 5) {
        result = "< 5 сек"
    } else
    if (value < 10) {
        result = "< 10 сек"
    } else
    if (value < 15) {
        result = "< 15 сек"
    } else if (value < 30) {
        result = "< 15 сек"
    } else if (value < 30) {
        result = "менше хвилини тому"
    }

    return result;
  }
}