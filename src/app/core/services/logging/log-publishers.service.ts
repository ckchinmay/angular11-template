﻿import { Injectable } from '@angular/core';

import { LogPublisher, LogConsole, LogLocalStorage, LogWebApi } from "./log-publishers";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const PUBLISHERS_FILE = "assets/log-publishers.json";

// ****************************************************
// Log Publisher Config Definition Class
// ****************************************************
class LogPublisherConfig {
  loggerName: string;
  loggerLocation: string;
  isActive: boolean;
}

// ****************************************************
// Logging Publishers Service Class
// ****************************************************
@Injectable({
  providedIn: 'root'
})
export class LogPublishersService {
  constructor(private http: HttpClient) {
    // Build publishers arrays
    this.buildPublishers();
  }

  // Public properties
  publishers: LogPublisher[] = [];

  // *************************
  // Public methods
  // *************************
  // Build publishers array
  buildPublishers(): void {
    let logPub: LogPublisher;

    this.getLoggers().subscribe(response => {
      for (let pub of response.filter(p => p.isActive)) {
        switch (pub.loggerName.toLowerCase()) {
          case "console":
            logPub = new LogConsole();
            break;
          case "localstorage":
            logPub = new LogLocalStorage();
            break;
          case "webapi":
            logPub = new LogWebApi(this.http);
            break;
        }
        // Set location of logging
        logPub.location = pub.loggerLocation;
        // Add publisher to array
        this.publishers.push(logPub);
      }
    });
  }

  // Get logger configuration info from JSON file
  getLoggers(): Observable<LogPublisherConfig[]> {
    return this.http.get(PUBLISHERS_FILE)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleErrors)
      );

  }

  // *************************
  // Private methods
  // *************************  
  private handleErrors(error: any): Observable<any> {
    let errors: string[] = [];
    let msg: string = "";

    msg = "Status: " + error.status;
    msg += " - Status Text: " + error.statusText;
    errors.push(msg);

    console.error('An error occurred', errors);

    return throwError(errors);
  }
}