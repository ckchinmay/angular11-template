import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { ConfigToken, SessionExpirationConfig } from '@app/utility/models/session-expiration-config';
/* Services */
import * as coreServices from './services';
import { TokenInterceptor } from './interceptors';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@app/modules/icons/icons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ToastrModule } from 'ngx-toastr';
import { GlobalErrorHandler } from './services/global-error-handler/global-error-handler.service';
import { SessionTimerHttpInterceptor } from './services';

@NgModule({
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ToastrModule.forRoot(), // ToastrModule added
    IconsModule,
    NgbModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [
    {
      provide: ConfigToken,
      useValue: <SessionExpirationConfig>{
        totalMinutes: 4
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionTimerHttpInterceptor,
      multi: true
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },

    ...coreServices.services
  ],
})

export class CoreModule {

  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error("You should import core module only in the root module")
    }
  }
}
