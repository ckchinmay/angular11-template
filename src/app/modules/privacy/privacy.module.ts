import { NgModule } from '@angular/core';
import * as privacyComponent from './components';

@NgModule({
  declarations: [...privacyComponent.components],
  imports: [
  ],
  exports:[...privacyComponent.components]
})
export class PrivacyModule { }

