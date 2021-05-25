/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';

/* Modules */

/* Containers */
import * as authContainers from './containers';

/* Services */
import * as authServices from './services';

/* Interceptors */
import { fakeBackendProvider } from './interceptors/fake-login-backend'
import { NavigationModule } from '../navigation/navigation.module';


@NgModule({
    imports: [
        NavigationModule
    ],
    providers: [...authServices.services, fakeBackendProvider],
    declarations: [...authContainers.containers],
    exports: [...authContainers.containers],
})
export class AuthModule { }
