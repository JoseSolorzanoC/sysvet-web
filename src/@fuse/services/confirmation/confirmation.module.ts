import { NgModule } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [FuseConfirmationDialogComponent],
    imports: [SharedModule],
    providers: [FuseConfirmationService],
})
export class FuseConfirmationModule {
    /**
     * Constructor
     */
    constructor(private _fuseConfirmationService: FuseConfirmationService) {}
}
