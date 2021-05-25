import { APPRouteData } from '@app/modules/navigation/models';
import { NavigationService } from '@app/modules/navigation/services';
import { of } from 'rxjs';

export const NavigationServiceStub: Partial<NavigationService> = {
    sideNavVisible$: () => of(true),
    toggleSideNav: (visibility?: boolean) => {},
    routeData$: () => of({} as APPRouteData),
    currentURL$: () => of('TEST_URL'),
};
