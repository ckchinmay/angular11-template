import { Component, OnInit } from '@angular/core';
import { SessionTimerService } from '@app/core/services';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionInteruptService } from '../../../core/services/session-timer/session-interupt.service';

@Component({
  templateUrl: './session-expiration-alert-modal.component.html'
})
export class SessionExpirationAlertModalComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private sessionInterupter: SessionInteruptService,
    public sessionTimer: SessionTimerService
  ) { }

  ngOnInit() { }
  continue() {
    this.activeModal.close();
    this.sessionInterupter.continueSession();
    this.sessionTimer.resetTimer();

  }
  logout() {
    this.activeModal.close();
    this.sessionInterupter.stopSession();
    this.sessionTimer.stopTimer();
  }
}
