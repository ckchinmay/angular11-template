/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';

/* Components */
import * as dashboardComponents from './components';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards';

/* Services */
import * as dashboardServices from './services';

/* Modules */
import { NavigationModule } from '@app/modules/navigation/navigation.module';
import { UtilityModule } from '@app/utility/utility.module';

@NgModule({
    imports: [
        UtilityModule,
        NavigationModule
    ],
    providers: [...dashboardServices.services, ...dashboardGuards.guards],
    declarations: [...dashboardContainers.containers, ...dashboardComponents.components],
    exports: [
        ...dashboardContainers.containers, 
        ...dashboardComponents.components
    ],
})
export class DashboardModule {}
