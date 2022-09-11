import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthSignUpComponent } from 'app/modules/auth/sign-up/sign-up.component';
import { authSignupRoutes } from 'app/modules/auth/sign-up/sign-up.routing';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [AuthSignUpComponent],
    imports: [RouterModule.forChild(authSignupRoutes), SharedModule],
})
export class AuthSignUpModule {}
