import { Component, Input } from '@angular/core';
import { SideNavItem } from '@app/modules/navigation/models';

@Component({
    selector: 'app-side-nav-item-min',
    templateUrl: './side-nav-item-min.component.html',
    styleUrls: ['side-nav-item-min.component.scss'],
})
export class SideNavItemMinComponent {
    @Input() sideNavItem!: SideNavItem;

    constructor() { }
}

