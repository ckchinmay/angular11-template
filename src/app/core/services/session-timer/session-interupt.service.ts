import { Injectable } from '@angular/core';
import { AuthService } from '@app/modules/auth/services';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SessionInteruptService {
  private renewTokenResult = new Subject<any>();

  constructor(
    private authService: AuthService) {
  }

  /**
   * Method to refresh session cookie. Normally, this method issue a quick API call to server.
   *
   * @memberof SessionInteruptService
   */
  continueSession() {
    this.authService.renewToken().subscribe(
      res => {
        this.renewTokenResult.next(res);
      },
      err => {
        this.renewTokenResult.next(err);
      }
    )
  }

  /**
   * Method to remove session cookie. Normally, this method redirect to website log out end point.
   *
   * @memberof SessionInteruptService
   */
  stopSession() {
    this.authService.signOut();
  }

  renewedToken(): Observable<any> {
    return this.renewTokenResult.asObservable();
  }
}
