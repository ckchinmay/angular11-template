import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthCheckGuard } from './auth-check.guard';

describe('Auth-Check Guards', () => {
    let authCheckGuard: AuthCheckGuard;
    let route: ActivatedRouteSnapshot;
    let state: RouterStateSnapshot;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [AuthCheckGuard, {
                provide: ActivatedRouteSnapshot,
                useClass: MockActivatedRouteSnapshot
            },
                {
                    provide: RouterStateSnapshot,
                    useClass: MockRouterStateSnapshot
                }],
        });
        authCheckGuard = TestBed.get(AuthCheckGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            route = TestBed.get(ActivatedRouteSnapshot);
            state = TestBed.get(RouterStateSnapshot);
            expect(authCheckGuard.canActivate(route, state)).toBe(true)
        });
    });
});

class MockActivatedRouteSnapshot {
    private _data: any;
    get data() {
        return this._data;
    }
}

class MockRouterStateSnapshot {
    private _data: any;
    get data() {
        return this._data;
    }
}

