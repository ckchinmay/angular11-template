/* tslint:disable: ordered-imports*/
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APPRouteData } from '@app/modules/navigation/models';

/* Module */
import { PrivacyModule } from './privacy.module';

/* Components */
import * as PrivacyComponents from './components';

/* Routes */
const ROUTES: Routes = [
    
    {
        path: '',
        children: [
            {
                path: '',
                data: {
                    title: 'Privacy',
                    breadcrumbs: [
                        {
                            text: 'Privacy',
                            active: true,
                        },
                    ],
                } as APPRouteData,
                canActivate: [],
                component: PrivacyComponents.PrivacyComponent,
            }
        ]
    }
];


@NgModule({
    imports: [PrivacyModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class PrivacyRoutingModule { }
