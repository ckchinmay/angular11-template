import { PostListComponent }    from './post-list/post-list.component';
import { PostListResolver }     from './post-list/post-list-resolver-service';
import { PostDetailsResolver }  from './post-details/post-details-resolver-service';
import { PostCreateComponent }  from './post-create/post-create.component';
import { PostUpdateComponent }  from './post-update/post-update.component';
import { PostDeleteComponent }  from './post-delete/post-delete.component';
import { PostDetailsComponent } from './post-details/post-details.component';

export const components = [
    PostListComponent,
    PostCreateComponent,
    PostUpdateComponent,
    PostDeleteComponent,
    PostDetailsComponent
];

export const resolvers = [
    PostListResolver,
    PostDetailsResolver
]

export * from './post-list/post-list.component';
export * from './post-list/post-list-resolver-service';
export * from './post-details/post-details-resolver-service';
export * from './post-create/post-create.component';
export * from './post-update/post-update.component';
export * from './post-delete/post-delete.component';
export * from './post-details/post-details.component';
