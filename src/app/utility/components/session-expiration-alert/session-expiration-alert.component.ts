import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { SessionExpirationAlertModalComponent } from '../session-expiration-alert-modal/session-expiration-alert-modal.component';
import { SessionInteruptService } from '../../../core/services/session-timer/session-interupt.service';
import jwt_decode from 'jwt-decode';
import { SessionTimerService } from '@app/core/services';

@Component({
  selector: 'session-expiration-alert',
  template: ''
})
export class SessionExpirationAlertComponent
  implements OnInit, OnChanges, OnDestroy {
  @Input() startTimer?= true;
  @Input() alertAt?= 60;
  private modalRef: NgbModalRef;
  private sessionTimerSubscription: Subscription;
  private decodedToken: any = null;
  tokenSubscription: Subscription;

  constructor(
    private sessionTimer: SessionTimerService,
    private modalService: NgbModal,
    private sessionInterupter: SessionInteruptService
  ) {

  }

  ngOnInit() {
    this.tokenSubscription = this.sessionInterupter.renewedToken().subscribe(
      data => {
        if (data) {
          if (this.startTimer) {
            this.checkSession();
          }
        } else {
        }

      });

    this.sessionTimerSubscription = this.sessionTimer.remainSeconds$.subscribe(
      t => {
        if (t === this.alertAt) {
          this.modalRef = this.modalService.open(
            SessionExpirationAlertModalComponent,
            {
              backdrop: 'static',
              keyboard: false
            }
          );
        }
        if (t === 0) {
          if (this.modalRef) {
            this.modalRef.close();
          }
          this.cleanUp();
          this.sessionInterupter.stopSession();
        }
      }
    );

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.alertAt) {
      if (changes.alertAt.currentValue) {
        if (this.startTimer) {
          this.checkSession();
        }
      }
    }
  }

  checkSession() {
    if (localStorage.getItem('JWT_TOKEN')) {
      this.decodedToken = jwt_decode(localStorage.getItem('JWT_TOKEN'));
      var date = new Date().getTime() / 1000;
      if (this.decodedToken.exp < date) {
        console.log('SessionExpirationAlertComponent The token has expired');
      } else {
        var diff = this.decodedToken.exp - date;
        this.sessionTimer.setTimeout(parseInt(diff.toString()));
      }
    }
  }

  cleanUp() {
    this.sessionTimer.stopTimer();
    if (this.sessionTimerSubscription) {
      this.sessionTimerSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.cleanUp();
    this.tokenSubscription.unsubscribe();
  }

}

