import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, noop } from 'rxjs';
import { AuthService } from '@app/modules/auth/services'

@Component({
    selector: 'app-top-nav-user',
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    subscription: Subscription;
    currentUser;
    constructor(
        private authService: AuthService) {
        this.subscription = this.authService.changedSignedUser().subscribe(
            data => {
                if (data) {
                    this.currentUser = data;
                } else {
                    this.currentUser = null;
                }
                this.currentUser ? this.currentUser.email = 'no-reply@mymail.com' : noop;
            });
    }
    ngOnInit() {
        this.currentUser = this.authService.currentUser;
        this.currentUser ? this.currentUser.email = 'no-reply@mymail.com' : noop;
    }

    logout() {
        this.authService.signOut();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
