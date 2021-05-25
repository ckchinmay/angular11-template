import {  Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SideNavItems, SideNavSection } from '@app/modules/navigation/models';
import { NavigationService } from '@app/modules/navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-side-nav-min',
    templateUrl: './side-nav-min.component.html',
    styleUrls: ['side-nav-min.component.scss'],
})
export class SideNavMinComponent implements OnInit, OnDestroy {
    @Input() sidenavStyle!: string;
    @Input() sideNavItems!: SideNavItems;
    @Input() sideNavSections!: SideNavSection[];

    subscription: Subscription = new Subscription();
    routeDataSubscription!: Subscription;

    constructor(public navigationService: NavigationService) {}

    ngOnInit() {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
