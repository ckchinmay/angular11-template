import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators'

import { AuthService } from '@modules/auth/services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    resetForm: any;
    loading = false
    submitted = false;

    constructor(private authService: AuthService,
        private alertService: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.resetForm = this.fb.group({
            email: ['', [Validators.required,
            Validators.email]]
        });
    }

    resetPassword() {
        if (this.resetForm.valid) {
            this.loading = true;
            this.authService.resetPassword(this.resetForm.value)
                .pipe(finalize(() => this.loading = false)).subscribe(
                    res => {
                        this.alertService.success(res.message);
                        this.submitted = true;
                    },
                    err => {
                        this.alertService.error(err.error.msg);
                    }
                )

        }

    }
}



