import { LogEntry } from './log.service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

// ****************************************************
// Log Publisher Abstract Class
// NOTE: This class must be located BEFORE
//       all those that extend this class
// ****************************************************
export abstract class LogPublisher {
  location: string;

  abstract log(record: LogEntry): Observable<boolean>
  abstract clear(): Observable<boolean>;
}

// ****************************************************
// Console Logging Class
// ****************************************************
export class LogConsole extends LogPublisher {
  log(entry: LogEntry): Observable<boolean> {
    // Log to console
    console.log(entry.buildLogString());

    return of(true);
  }

  clear(): Observable<boolean> {
    console.clear();

    return of(true);
  }
}

// ****************************************************
// Local Storage Logging Class
// ****************************************************
export class LogLocalStorage extends LogPublisher {
  constructor() {
    // Must call super() from derived classes
    super();
    // Set location
    this.location = "logging";
  }

  // Append log entry to local storage
  log(entry: LogEntry): Observable<boolean> {
    let ret: boolean = false;
    let values: LogEntry[];

    try {
      // Retrieve previous values from local storage
      values = JSON.parse(localStorage.getItem(this.location)) || [];
      // Add new log entry to array
      values.push(entry);
      // Store array into local storage
      localStorage.setItem(this.location, JSON.stringify(values));

      // Set return value
      ret = true;
    } catch (ex) {
      // Display error in console
      console.log(ex);
    }

    return of(ret);
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return of(true);
  }
}

// ****************************************************
// Logging Web API Class
// ****************************************************
export class LogWebApi extends LogPublisher {
  constructor(private http: HttpClient) {
    // Must call super() from derived classes
    super();
    // Set location
    this.location = "/api/logging";
  }

  // **************
  // Public Methods
  // **************

  // Add log entry to back end data store
  log(entry: LogEntry): Observable<boolean> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.post(this.location, entry, httpOptions)
      .pipe(
        map((res: any) => {
          return res.json();
        }),
        catchError(this.handleErrors)
      );

  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    // TODO: Call Web API to clear all values
    return of(true);
  }

  // ***************
  // Private Methods
  // ***************
  private handleErrors(error: any): Observable<any> {
    let errors: string[] = [];
    let msg: string = "";

    msg = "Status: " + error.status;
    msg += " - Status Text: " + error.statusText;
    if (error.json()) {
      msg += " - Exception Message: " + error.json().exceptionMessage;
    }
    errors.push(msg);

    console.error('An error occurred', errors);

    return Observable.throw(errors);
  }
}