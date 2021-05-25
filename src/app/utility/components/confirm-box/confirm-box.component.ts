import { Component, OnInit } from '@angular/core';
import { ConfirmBoxService } from '@app/core/services';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent implements OnInit {
  message: any;
  constructor(
    private confirmDialogService: ConfirmBoxService
  ) { }

  ngOnInit(): any {
    /**
     *   This function waits for a message from alert service, it gets
     *   triggered when we call this from any other component
     */
    this.confirmDialogService.messageObserver.subscribe(message => {
      this.message = message;
    });
  }

}

