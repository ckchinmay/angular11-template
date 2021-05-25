import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmBoxService {
  message: any;
  messageObserver: Subject<any> = new Subject<any>();

  constructor(
  ) {
    // watch variable
    this.messageObserver.subscribe(value => this.message = null);
  }

  confirmThis(message: string, yesFn: () => void, noFn: () => void): any {
    this.setConfirmation(message, yesFn, noFn);
  }

  setConfirmation(message: string, yesFn: () => void, noFn: () => void): any {
    const that = this;

    this.messageObserver.next(
      {
        type: 'confirm',
        text: message,
        yesFn(): any {
          that.messageObserver.next(null); // This will close the modal
          yesFn();
        },
        noFn(): any {
          that.messageObserver.next(null);
          noFn();
        }
      }
    );

  }

}
