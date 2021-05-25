/* tslint:disable: ordered-imports*/
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@app/modules/icons/icons.module';

/* Components */
import * as utilityComponents from './components';

/* Containers */
import * as utilityContainers from './containers';

/* Guards */
import * as utilityGuards from './guards';


@NgModule({
    imports: [
        CommonModule,
        IconsModule,
        RouterModule,
        FormsModule 
    ],
    providers: [
        ...utilityGuards.guards
    ],
    declarations: [...utilityContainers.containers, ...utilityComponents.components],
    exports: [
        ...utilityContainers.containers,
        ...utilityComponents.components
    ],
})
export class UtilityModule { }
