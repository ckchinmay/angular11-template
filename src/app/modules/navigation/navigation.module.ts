/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';

/* Modules */
import { UtilityModule } from '@app/utility/utility.module';

/* Components */
import * as navigationComponents from './components';

/* Containers */
import * as navigationContainers from './containers';

/* Layouts */
import * as appCommonLayouts from './layouts';

/* Guards */
import * as navigationGuards from './guards';

/* Services */
import * as navigationServices from './services';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        UtilityModule
    ],
    providers: [...navigationServices.services, ...navigationGuards.guards],
    declarations: [
        ...navigationContainers.containers,
        ...navigationComponents.components,
        ...appCommonLayouts.layouts
    ],
    exports: [
        SharedModule,
        ...navigationContainers.containers,
        ...navigationComponents.components,
        ...appCommonLayouts.layouts,
    ],

})
export class NavigationModule { }
