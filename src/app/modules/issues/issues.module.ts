/* tslint:disable: ordered-imports*/
/* Modules */
import { NgModule } from '@angular/core';
import { NavigationModule } from '../navigation/navigation.module';

/* Components */
import * as issuesComponents from './components';

/* Guards */
import * as issuesGuards from './guards';

/* Services */
import * as issuesServices from './services';

@NgModule({
    imports: [
        NavigationModule
    ],
    providers: [...issuesServices.services, ...issuesGuards.guards, ...issuesComponents.resolvers],
    declarations: [...issuesComponents.components],
    exports: [...issuesComponents.components],
})

export class IssuesModule { }
