import {  Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { SideNavItems, SideNavSection } from '@app/modules/navigation/models';
import { NavigationService } from '@app/modules/navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
    @Input() sidenavStyle!: string;
    @Input() sideNavItems!: SideNavItems;
    @Input() sideNavSections!: SideNavSection[];

    subscription: Subscription = new Subscription();
    routeDataSubscription!: Subscription;
    currentUser;
    subscriptionUser: Subscription;

    constructor(public navigationService: NavigationService, public authService: AuthService) {
        this.subscriptionUser = this.authService.changedSignedUser().subscribe(
            data => {
                if (data) {
                    this.currentUser = data;
                } else {
                    this.currentUser = null;
                }
            });
    }
    ngOnInit() {
        this.currentUser = this.authService.currentUser;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscriptionUser.unsubscribe();
    }
}
