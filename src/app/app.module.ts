import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigToken, SessionExpirationConfig } from '@app/utility/models/session-expiration-config';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        CoreModule
    ],
    providers: [
        {
            provide: ConfigToken,
            useValue: <SessionExpirationConfig>{
                totalMinutes: 4
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
