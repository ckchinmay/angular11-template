import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BugService } from "../../services/bug.service";
import { Bug } from "../../models/bug";

@Injectable()
export class IssueListResolver implements Resolve<Observable<Bug[]>> {

  constructor(private issueService: BugService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.issueService.GetIssues().pipe(
      catchError((err: any, caught: Observable<any>) => {
        return of(null);
      })
    );

  }
}