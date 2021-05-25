/* tslint:disable: ordered-imports*/
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APPRouteData } from '@app/modules/navigation/models';

/* Module */
import { AboutModule } from './about.module';

/* Components */
import * as AboutComponents from './components';

/* Routes */
const ROUTES: Routes = [
    
    {
        path: '',
        children: [
            {
                path: '',
                data: {
                    title: 'About',
                    breadcrumbs: [
                        {
                            text: 'About',
                            active: true,
                        },
                    ],
                } as APPRouteData,
                canActivate: [],
                component: AboutComponents.AboutComponent,
            }
        ]
    }
];


@NgModule({
    imports: [AboutModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AboutRoutingModule { }
