import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import jwt_decode from 'jwt-decode';
import {
    SignedUser,
    UserSettings
} from '../models';
import { JwtTokenService } from '@app/core/services/jwt-token/jwt-token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiUrl = 'http://localhost:8000/auth';
    private subject = new Subject<any>();

    constructor(private http: HttpClient,
        private tokenService: JwtTokenService,
        private router: Router) { }

    currentUser = this.getSignedUser();

    signUp(user) {
        return this.http.post<any>(`${this.apiUrl}/register`, user);
    }

    signIn(user) {
        return this.http.post<any>(`${this.apiUrl}/login`, user);
    }

    signOut() {
        this.tokenService.destroyToken();
        localStorage.removeItem('SIGNED_USER');
        this.subject.next();
        this.router.navigate(['auth', 'login']);
    }

    resetPassword(user) {
        return this.http.post<any>(`${this.apiUrl}/reset`, user);
    }

    saveToken(accessToken: string, refreshToken: string) {
        localStorage.setItem('JWT_TOKEN', accessToken);
        localStorage.setItem('JWT_REFRESH_TOKEN', refreshToken);
        this.saveSignedUser(accessToken);
    }

    saveSignedUser(accessToken: string) {
        var decodedToken: any = jwt_decode(accessToken);
        var signedUser: SignedUser = {
            fname: decodedToken.fname,
            lname: decodedToken.lname
        };
        localStorage.setItem('SIGNED_USER', JSON.stringify(signedUser));
        this.subject.next(signedUser);
    }

    getSignedUser(): SignedUser {
        if (this.tokenService.isTokenExpired()) {
            localStorage.removeItem('SIGNED_USER');
            return null;
        }

        var signedUser = localStorage.getItem('SIGNED_USER');
        return JSON.parse(signedUser);
    }

    changeSignedUser(userSettings: UserSettings) {
        var updatedSignedUser: SignedUser = {
            fname: userSettings.fname,
            lname: userSettings.lname
        };

        localStorage.setItem('SIGNED_USER', JSON.stringify(updatedSignedUser));
        this.subject.next(updatedSignedUser);
    }

    changedSignedUser(): Observable<any> {
        return this.subject.asObservable();
    }

    renewToken() {
        const refreshToken = localStorage.getItem("JWT_REFRESH_TOKEN");
        if (!refreshToken) return of(false);
        return this.http.post(`${this.apiUrl}/reissueToken`, { refreshToken: refreshToken }).
            pipe(
                map((data: any) => {
                    this.saveToken(data.accessToken, data.refreshToken);
                    return true;
                })
            )
    }

    getAuth$(): Observable<{}> {
        return of({});
    }
}



