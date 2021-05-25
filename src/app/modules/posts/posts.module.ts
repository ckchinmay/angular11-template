/* tslint:disable: ordered-imports*/
/* Modules */
import { NgModule } from '@angular/core';
import { NavigationModule } from '../navigation/navigation.module';

/* Components */
import * as postsComponents from './components';

/* Guards */
import * as postsGuards from './guards';

/* Services */
import * as postsServices from './services';

@NgModule({
    imports: [
        NavigationModule
    ],
    providers: [...postsServices.services, ...postsGuards.guards, ...postsComponents.resolvers],
    declarations: [...postsComponents.components],
    exports: [...postsComponents.components],
})
export class PostsModule { }
