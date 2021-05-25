/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APPRouteData } from '@app/modules/navigation/models';

/* Module */
import { PostsModule } from './posts.module';

/* Components */
import * as postsComponents from './components';

/* Guards */
import * as postsGuards from './guards';

/* Routes */
const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Posts',
            breadcrumb: null
        } as APPRouteData,
        children: [
            {
                path: '',
                data: {
                    title: 'Posts',
                    breadcrumb: "Posts"
                } as APPRouteData,
                children: [
                    {
                        path: '',
                        component: postsComponents.PostListComponent,
                        resolve: {
                            posts: postsComponents.PostListResolver
                        },
                        data: {
                            title: 'Posts',
                            breadcrumb: null
                        } as APPRouteData,
                        canActivate: []
                    },
                    {
                        path: 'add',
                        component: postsComponents.PostCreateComponent,
                        data: {
                            title: 'Add post',
                            breadcrumb: 'Add'
                        } as APPRouteData,
                        canActivate: [],
                    },
                    {
                        path: 'update/:id',
                        component: postsComponents.PostUpdateComponent,
                        data: {
                            title: 'Update post',
                            breadcrumb: 'Update'
                        } as APPRouteData,
                        canActivate: [],
                    },
                    {
                        path: 'details/:id',
                        component: postsComponents.PostDetailsComponent,
                        resolve: {
                            post: postsComponents.PostDetailsResolver
                        },
                        data: {
                            title: 'Details post',
                            breadcrumb: 'Details'
                        } as APPRouteData,
                        canActivate: [],
                    }
                ],
            },

        ]
    }
];

@NgModule({
    imports: [PostsModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class PostsRoutingModule { }
