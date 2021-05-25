import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@app/modules/navigation/services';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    constructor(private navigationService: NavigationService) { }
    ngOnInit() { }
    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }
}
