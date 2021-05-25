import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtTokenService } from '../../core/services';

@Injectable({
  providedIn:'root'
})
export class AuthCheckGuard implements CanActivate {

  constructor(private router: Router,
    private tokenService: JwtTokenService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.tokenService.isTokenExpired()) {
      return true;
    }
    console.log("invalid token");
    this.router.navigate(['auth', 'login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

