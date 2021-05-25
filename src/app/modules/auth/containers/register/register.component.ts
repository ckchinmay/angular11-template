import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators'

import { AuthService } from '@app/modules/auth/services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {

    signUpForm: FormGroup;
    loginForm: FormGroup;
    loading = false;
    error_messages = {
        'fname': [
            { type: 'required', message: 'Required.' },
            { type: 'minlength', message: 'Should have minimum 3 characters.' }
        ],

        'lname': [
            { type: 'required', message: 'Required.' },
            { type: 'minlength', message: 'Should have minimum 3 characters.' },
        ],

        'email': [
            { type: 'required', message: 'Required.' },
            { type: 'minlength', message: 'Should have minimum 6 characters.' },
            { type: 'maxlength', message: 'Should have maximum 30 characters.' },
            { type: 'email', message: 'Invalid.' }
        ],

        'password': [
            { type: 'required', message: 'Required.' },
            { type: 'minlength', message: 'Should have minimum 6 characters.' },
            { type: 'maxlength', message: 'Should have maximum 30 characters.' }
        ],
        'confirmPassword': [
            { type: 'required', message: 'Required.' },
            { type: 'minlength', message: 'Should have minimum 6 characters.' },
            { type: 'maxlength', message: 'Should have maximum 30 characters.' }
        ],
    }

    constructor(private authService: AuthService,
        private alertService: ToastrService,
        private router: Router,
        private fb: FormBuilder) {

        this.signUpForm = this.fb.group({
            fname: new FormControl('', Validators.compose([Validators.required,
            Validators.minLength(3)])),
            lname: new FormControl('', Validators.compose([Validators.required,
            Validators.minLength(3)])),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.email,
                Validators.minLength(6),
                Validators.maxLength(30)
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30)
            ])),
            confirmPassword: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30)
            ])),
        }, {
            validators: this.password.bind(this)
        });
    }

    password(formGroup: FormGroup) {
        const password = formGroup.get('password');
        const confirmPassword = formGroup.get('confirmPassword');
        return password.value === confirmPassword.value ? null : { passwordNotMatch: true };
    }

    ngOnInit() {
    }

    signUp() {

        if (this.signUpForm.valid) {
            this.loading = true;

            this.authService.signUp(this.signUpForm.value)
                .pipe(finalize(() => this.loading = false)).subscribe(
                    res => {
                        this.authService.saveToken(res.accessToken, res.refreshToken);
                        this.router.navigate(['/']);
                    },
                    err => {
                        throw (err);
                    }
                )
        }
    }
}

