import { Component, OnDestroy, OnInit } from '@angular/core';
import { Breadcrumb } from '@app/modules/navigation/models';
import { NavigationService } from '@app/modules/navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();
    breadcrumbs: Breadcrumb[];

    constructor(public navigationService: NavigationService) {
    }

    ngOnInit() {
        this.subscription.add(
            this.navigationService.observableBreadcrumbs
                .subscribe(item => {
                    this.breadcrumbs = item;
                })
        );
        this.navigationService.updateBreadcrumb();
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
