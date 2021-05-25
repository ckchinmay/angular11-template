import {
    Component,
    OnInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators'

import { AuthService } from '@modules/auth/services';
import { ToastrService } from 'ngx-toastr';
import { LogService } from '@app/core/services';
import { throwError } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    signInForm: any;
    loading = false
    returnUrl: string = '';

    constructor(private authService: AuthService,
        private alertService: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private loggerService: LogService
    ) { }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.signInForm = this.fb.group({
            email: ['', [Validators.required,
            Validators.email]],
            password: ['', [Validators.required,
            Validators.minLength(8)]],
            rememberMe: [false]
        });
    }

    signIn() {
        if (this.signInForm.valid) {
            this.loading = true;
            this.authService.signIn(this.signInForm.value)
                .pipe(finalize(() => this.loading = false)).subscribe(
                    res => {
                        this.authService.saveToken(res.accessToken, res.refreshToken);
                        this.router.navigateByUrl(this.returnUrl);
                    },
                    err => {
                        throw (err);
                    }
                )

        }

    }

}

