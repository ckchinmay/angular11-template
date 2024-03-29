/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APPRouteData } from '@app/modules/navigation/models';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards';

/* Routes */
const ROUTES: Routes = [
    
    {
        path: '',
        children: [
            {
                path: '',
                data: {
                    title: 'Dashboard',
                    breadcrumbs: [
                        {
                            text: 'Dashboard',
                            active: true,
                        },
                    ],
                } as APPRouteData,
                canActivate: [],
                component: dashboardContainers.DashboardComponent,
            }
        ]
    }
];


@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
