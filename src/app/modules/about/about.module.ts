import { NgModule } from '@angular/core';
import { NavigationModule } from '../navigation/navigation.module';
/* Components */
import * as aboutComponents from './components';


@NgModule({
  declarations: [...aboutComponents.components],
  imports: [
    NavigationModule
  ],
  exports:[...aboutComponents.components]
})
export class AboutModule { }
