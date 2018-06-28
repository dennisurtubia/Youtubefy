import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {

    transform(value: number): string {
        value = +(value.toPrecision(2));
        const minutes: number = Math.floor(+(Math.round(value) / 60));
        const seconds: number = ((value - minutes) * 60);

        return minutes + ':' + seconds;
    }

}