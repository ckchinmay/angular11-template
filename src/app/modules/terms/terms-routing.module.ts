/* tslint:disable: ordered-imports*/
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APPRouteData } from '@app/modules/navigation/models';

/* Module */
import { TermsModule } from './terms.module';

/* Components */
import * as TermsComponents from './components';

/* Routes */
const ROUTES: Routes = [
    
    {
        path: '',
        children: [
            {
                path: '',
                data: {
                    title: 'Terms',
                    breadcrumbs: [
                        {
                            text: 'Terms',
                            active: true,
                        },
                    ],
                } as APPRouteData,
                canActivate: [],
                component: TermsComponents.TermsComponent,
            }
        ]
    }
];


@NgModule({
    imports: [TermsModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class TermsRoutingModule { }
