import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector: 'app-mi-informacion',
    templateUrl: './mi-informacion.component.html',
    styleUrls: ['./mi-informacion.component.scss'],
})
export class MiInformacionComponent implements OnInit {
    user: any;

    profileForm: FormGroup;
    editMode = false;
    isLoading = false;

    constructor(
        private userService: UserService,
        private _fb: FormBuilder,

        private _snackBar: MatSnackBar
    ) {
        this.userService.user$.subscribe((res) => {
            this.user = res;
            if (this.user) {
                this.profileForm = this._fb.group({
                    email: [this.user.email, [Validators.required]],
                    password: [this.user.password, [Validators.required]],
                    person: this._fb.group({
                        fullName: [
                            this.user.person?.fullName,
                            [Validators.required],
                        ],
                        birthDate: [this.user.person?.birthDate],
                        cellphone: [
                            this.user.person?.cellphone,
                            [Validators.required],
                        ],
                    }),
                });
                this.profileForm.disable();
            }
        });
    }

    ngOnInit(): void {}

    toggleEditMode(): void {
        this.editMode = !this.editMode;
        if (this.editMode) {
            this.profileForm.enable();
        } else {
            this.profileForm.disable();
            this.isLoading = true;
            this.userService.update(this.profileForm.value).subscribe((res) => {
                this.isLoading = false;
                this._snackBar.open('Informacion actualizada.', 'OK', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    duration: 5000,
                    panelClass: ['bg-white', 'text-black'],
                });
            });
        }
    }
}
