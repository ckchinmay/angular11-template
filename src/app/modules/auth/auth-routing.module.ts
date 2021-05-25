/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APPRouteData } from '@app/modules/navigation/models';

/* Module */
import { AuthModule } from './auth.module';

/* Containers */
import * as authContainers from './containers';

import { LayoutAuthComponent } from '@app/modules/navigation/layouts'

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        component: LayoutAuthComponent,
        data: {
            title: 'Home',
            breadcrumb: null
        } as APPRouteData,
        children: [

            {
                path: 'login',
                canActivate: [],
                component: authContainers.LoginComponent,
                data: {
                    title: 'Login - MyApp',
                } as APPRouteData
            },
            {
                path: 'register',
                canActivate: [],
                component: authContainers.RegisterComponent,
                data: {
                    title: 'Register - MyApp',
                } as APPRouteData
            },
            {
                path: 'forgot-password',
                canActivate: [],
                component: authContainers.ForgotPasswordComponent,
                data: {
                    title: 'Forgot Password - MyApp',
                } as APPRouteData
            }
        ]
    }
];

@NgModule({
    imports: [AuthModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AuthRoutingModule { }
