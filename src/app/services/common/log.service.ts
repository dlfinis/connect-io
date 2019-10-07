import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class LogService extends NGXLogger {

    private getRepeatPrefix(prefix: string, repeat: number) {
      if (repeat > 0) {
        return prefix.repeat(repeat); // return "abc".repeat(3); => return "abcabcabc";
      } else {
        return '';
      }
    }

    public getLabel(content: string, prefix: string, times: number) {
      return this.getRepeatPrefix(prefix, times)
      .concat(' ')
      .concat(content)
      .concat(' ')
      .concat(this.getRepeatPrefix(prefix, times));
    }

    public printOrigin(name: string) {
      this.debug(this.getLabel(name, '*', 5));
    }

    public printDebug(name?: string, ...additional: any[]) {
      this.debug(this.getLabel(name, '*', 5), '\n', additional);
    }

    public printLabel(name?: string) {
      if(name) {
        this.debug(this.getLabel(name, '=', 5), '\n');
      } else {
        this.debug(this.getRepeatPrefix('-', 25));
      }
    }
}
