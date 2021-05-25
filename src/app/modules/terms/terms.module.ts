import { NgModule } from '@angular/core';
import * as termsComponent from './components';

@NgModule({
  declarations: [...termsComponent.components],
  imports: [
  ],
  exports:[...termsComponent.components]
})
export class TermsModule { }

