import { Injectable, Inject } from '@angular/core';
import { ConfigToken, SessionExpirationConfig } from '@app/utility/models/session-expiration-config';
import { Observable, Subject, interval, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SessionTimerService {
  private _timeoutSeconds: number = 0;
  private _count: number = 0;
  private timerSubscription: any;
  private timer: Observable<number> = interval(1000);
  private _remainSeconds = new Subject<number>();
  /**
   * Observable to get session remaining time (in seconds).
   *
   * Subscribers need to unsubscribe to it before hosting element is destroyed.
   *
   * @memberof SessionTimerService
   */
  remainSeconds$ = this._remainSeconds.asObservable();

  constructor(@Inject(ConfigToken) readonly config: SessionExpirationConfig
  ) {
    //this._timeoutSeconds = config.totalMinutes * 60;
  }

  setTimeout(totalSeconds: number) {
    this._timeoutSeconds = totalSeconds;
    this.startTimer();
  }

  getTimeout() {
    return this._timeoutSeconds;
  }

  startTimer() {
    this.stopTimer();
    this._count = this._timeoutSeconds;
    this.timerSubscription = this.timer.subscribe(n => {
      if (this._count > 0) {
        this._count--;
        this._remainSeconds.next(this._count);
      }
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  resetTimer() {
    this.startTimer();
  }
}
