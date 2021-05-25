import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LogService } from '..';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(
        private injector: Injector
    ) {
    }

    handleError(error: Error | HttpErrorResponse) {
        const logger = this.injector.get(LogService);
        const notifier = this.injector.get(ToastrService);

        let message;
        let stackTrace;

        if (error instanceof HttpErrorResponse) {
            // Server Error
            message = this.getServerMessage(error);
            stackTrace = this.getServerStack(error);
        } else {
            // Client Error
            message = this.getClientMessage(error);
            stackTrace = this.getClientStack(error);
        }
        console.log("in global = " + message);
        // Always log errors

        logger.error(message);
        notifier.error(message, null, { onActivateTick: true });
    }

    getClientMessage(error: Error): string {
        if (!navigator.onLine) {
            return 'No Internet Connection';
        }
        return error.message ? error.message : error.toString();
    }

    getClientStack(error: Error): string {
        return error.stack;
    }

    getServerMessage(error: HttpErrorResponse): string {
        return error.message;
    }

    getServerStack(error: HttpErrorResponse): string {
        // handle stack trace
        return 'stack';
    }
}