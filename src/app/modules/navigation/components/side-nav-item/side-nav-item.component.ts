import { Component, Input } from '@angular/core';
import { SideNavItem } from '@app/modules/navigation/models';

@Component({
    selector: 'app-side-nav-item',
    templateUrl: './side-nav-item.component.html',
    styleUrls: ['side-nav-item.component.scss'],
})
export class SideNavItemComponent{
    @Input() sideNavItem!: SideNavItem;

    constructor() {
    }
}
