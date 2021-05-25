import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDefaultComponent } from '@app/modules/navigation/layouts/layout-default/layout-default.component';
import { LayoutTermsComponent } from '@app/modules/navigation/layouts/layout-terms/layout-terms.component';
import { AuthCheckGuard } from '@app/utility/guards';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        data: {
            breadcrumb: 'Home'
        }
    },
    {
        path: '',
        component: LayoutDefaultComponent,
        data: {
            breadcrumb: 'Home'
        },
        children: [
            {
                path: 'posts',
                loadChildren: () =>
                    import('@app/modules/posts/posts-routing.module').then(
                        m => m.PostsRoutingModule
                    ),
                canActivate: [AuthCheckGuard],
            },
            {
                path: 'issues',
                loadChildren: () =>
                    import('@app/modules/issues/issues-routing.module').then(
                        m => m.IssuesRoutingModule
                    ),
                canActivate: [AuthCheckGuard],
            },
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('@app/modules/dashboard/dashboard-routing.module').then(
                        m => m.DashboardRoutingModule
                    ),
                canActivate: [AuthCheckGuard],
            },
            {
                path: 'about',
                loadChildren: () =>
                    import('@app/modules/about/about-routing.module').then(
                        m => m.AboutRoutingModule
                    ),
                canActivate: [AuthCheckGuard],
            },
            {
                path: 'terms',
                loadChildren: () =>
                    import('@app/modules/terms/terms-routing.module').then(
                        m => m.TermsRoutingModule
                    ),
                canActivate: [AuthCheckGuard],
            },
            {
                path: 'privacy',
                loadChildren: () =>
                    import('@app/modules/privacy/privacy-routing.module').then(
                        m => m.PrivacyRoutingModule
                    ),
                canActivate: [AuthCheckGuard],
            },
        ]
    },
    {
        path: 'policies',
        component: LayoutTermsComponent,
        data: {
            breadcrumb: 'Home'
        },
        children: [
            {
                path: 'terms',
                loadChildren: () =>
                    import('@app/modules/terms/terms-routing.module').then(
                        m => m.TermsRoutingModule
                    ),
                canActivate: [],
            },
            {
                path: 'privacy',
                loadChildren: () =>
                    import('@app/modules/privacy/privacy-routing.module').then(
                        m => m.PrivacyRoutingModule
                    ),
                canActivate: [],
            }
        ]
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('@app/modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
    },
    {
        path: 'error',
        loadChildren: () =>
            import('@app/modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () =>
            import('@app/modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { 
        useHash: true, 
        scrollPositionRestoration: 'enabled', 
        // enableTracing: true
     })], //enableTracing: true
    exports: [RouterModule],
})
export class AppRoutingModule { }
