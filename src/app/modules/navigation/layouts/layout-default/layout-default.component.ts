import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { sideNavItems, sideNavSections } from '@app/modules/navigation/data';
import { NavigationService } from '@app/modules/navigation/services';
import { Subscription } from 'rxjs';
import { ChildActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './layout-default.component.html',
  styleUrls: ['layout-default.component.scss'],
})
export class LayoutDefaultComponent implements OnInit, OnDestroy {
  @Input() hideBreadcrumbs = false;
  @Input() static = false;
  @Input() light = false;
  @HostBinding('class.app-sidenav-toggled') sideNavHidden = false;
  @HostBinding('class.app-sidenav-min') sideNavMinHidden = false;
  subscription: Subscription = new Subscription();
  sideNavItems = sideNavItems;
  sideNavSections = sideNavSections;
  sidenavStyle = 'app-sidenav-light';
  loading: boolean;
  constructor(
    public navigationService: NavigationService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof ChildActivationEnd))
      .subscribe(event => {
        for (let [k, v] of this.sideNavItems) {
          let rec = this.sideNavItems[k];
          if (!rec.submenu) {
            if (rec.link === this.router.url) {
              rec.isActive = true;
            } else {
              rec.isActive = false;
            }
          }
          else {
            rec.expanded = false;
            rec.isActive = false;
            rec.submenu.forEach(function (subRec) {
              subRec.isActive = false;
            });
            let matchRec = rec.submenu.find(i => i.link === this.router.url);
            if (matchRec) {
              rec.expanded = true;
              rec.isActive = true;
              matchRec.isActive = true;
            }
          }
        }
      });
  }
  ngOnInit() {
    if (this.light) {
      this.sidenavStyle = 'app-sidenav-light';
    }
    this.subscription.add(
      this.navigationService.sideNavVisible$().subscribe(isVisible => {
        this.sideNavHidden = !isVisible;
        this.sideNavMinHidden = !isVisible;
        this.changeDetectorRef.markForCheck();
      })
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}