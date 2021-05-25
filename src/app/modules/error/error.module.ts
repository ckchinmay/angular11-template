/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';

/* Modules */
import { NavigationModule } from '@app/modules/navigation/navigation.module';

/* Containers */
import * as errorContainers from './containers';


@NgModule({
    imports: [
        NavigationModule
    ],
    providers: [],
    declarations: [...errorContainers.containers],
    exports: [...errorContainers.containers],
})
export class ErrorModule { }
