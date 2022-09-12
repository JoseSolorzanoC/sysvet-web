import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { DocumentType } from 'app/shared/interfaces';
import { SharedService } from 'app/shared/shared.service';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;

    public documentTypes: DocumentType[];
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _sharedService: SharedService,
        private _snackBar: MatSnackBar
    ) {
        this._sharedService.getAllDocumentTypes().subscribe((res) => {
            this.documentTypes = res;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            documentType: ['', Validators.required],
            documentNumber: ['', [Validators.required]],
            fullName: ['', [Validators.required]],
            email: ['', [Validators.email, Validators.required]],
            password: ['', Validators.required],
            phoneNumber: ['', Validators.required],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp(this.signUpForm.value).subscribe(
            () => {
                this._snackBar.open(
                    'Usuario registrado. Inicia sesion con tus credenciales.',
                    'OK',
                    {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        duration: 5000,
                        panelClass: ['bg-white', 'text-black'],
                    }
                );

                // Navigate to the confirmation required page
                this._router.navigateByUrl('/sign-in');
            },
            (error) => {
                // Re-enable the form
                this.signUpForm.enable();

                // Reset the form
                this.signUpForm.controls.documentNumber.reset();
                this.signUpForm.controls.email.reset();

                // Set the alert
                this.alert = {
                    type: 'error',
                    message: `Error: ${error.error.message}`,
                };

                // Show the alert
                this.showAlert = true;
            }
        );
    }
}
