import { Injectable } from '@angular/core';
import { ActivatedRoute, ChildActivationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Breadcrumb } from '@app/modules/navigation/models';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    _sideNavVisible$ = new BehaviorSubject(true);
    private breadcrumbs: Array<Breadcrumb>;
    observableBreadcrumbs: BehaviorSubject<Breadcrumb[]>;

    constructor(public route: ActivatedRoute, public router: Router) {
        this.breadcrumbs = new Array<Breadcrumb>();
        this.observableBreadcrumbs = new BehaviorSubject<Breadcrumb[]>(this.breadcrumbs);
        this.router.events
            .pipe(filter(event => event instanceof ChildActivationEnd))
            .subscribe(event => {
                // let snapshot = (event as ChildActivationEnd).snapshot;
                // while (snapshot.firstChild !== null) {
                //     snapshot = snapshot.firstChild;
                // }
                // this._routeData$.next(snapshot.data as APPRouteData);
                // this._currentURL$.next(router.url);
                this.breadcrumbs = this.setBreadCrumb(this.route.root);
                this.observableBreadcrumbs.next(this.breadcrumbs);
            });
    }


    updateBreadcrumb() {
        this.breadcrumbs = this.setBreadCrumb(this.route.root);
        this.observableBreadcrumbs.next(this.breadcrumbs);
    }

    setBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
        const children: ActivatedRoute[] = route.children;
        if (children.length === 0) {
            if (breadcrumbs.length > 0) {
                breadcrumbs[breadcrumbs.length - 1].active = false;
            }
            return breadcrumbs;
        }
        for (const child of children) {
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
            if (routeURL !== '') {
                url += `/${routeURL}`;
            }

            const label = child.snapshot.data["breadcrumb"];
            if (typeof (label) != 'undefined' && label != null) {
                breadcrumbs.push(
                    {
                        active: true,
                        text: label,
                        link: "/" + url
                    });
            }
            return this.setBreadCrumb(child, url, breadcrumbs);
        }
    }

    sideNavVisible$(): Observable<boolean> {
        return this._sideNavVisible$;
    }

    toggleSideNav(visibility?: boolean) {
        if (typeof visibility !== 'undefined') {
            this._sideNavVisible$.next(visibility);
        } else {
            this._sideNavVisible$.next(!this._sideNavVisible$.value);
        }
    }

    observableBreadcrumbs$(): Breadcrumb[] {
        return this.observableBreadcrumbs.getValue();
    }

}
