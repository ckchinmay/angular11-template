/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APPRouteData } from '@app/modules/navigation/models';

/* Module */
import { IssuesModule } from './issues.module';

/* Components */
import * as issuesComponents from './components';

/* Guards */
import * as issuesGuards from './guards';

/* Routes */
const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Issues',
            breadcrumb: null
        } as APPRouteData,
        children: [
            {
                path: '',
                data: {
                    title: 'Issues',
                    breadcrumb: 'Issues'
                } as APPRouteData,
                children: [
                    {
                        path: '',
                        component: issuesComponents.IssueListComponent,
                        resolve: {
                            issues: issuesComponents.IssueListResolver
                        },
                        data: {
                            title: 'Issues',
                            breadcrumb: null
                        } as APPRouteData,
                        canActivate: []
                    },
                    {
                        path: 'add',
                        component: issuesComponents.AddIssueComponent,
                        data: {
                            title: 'Add issue',
                            breadcrumb: 'Add'
                        } as APPRouteData,
                        canActivate: [],
                    },
                    {
                        path: 'update/:id',
                        component: issuesComponents.EditIssueComponent,
                        data: {
                            title: 'Update issue',
                            breadcrumb: 'Update'
                        } as APPRouteData,
                        canActivate: [],
                    }
                ],
            },
        ]
    }
];

@NgModule({
    imports: [IssuesModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class IssuesRoutingModule { }
