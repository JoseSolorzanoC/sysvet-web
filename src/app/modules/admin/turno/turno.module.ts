import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { FormTurnosComponent } from './components/form-turnos/form-turnos.component';
import { ListTurnosComponent } from './components/list-turnos/list-turnos.component';
import { TurnoRoutingModule } from './turno-routing.module';

@NgModule({
    declarations: [ListTurnosComponent, FormTurnosComponent],
    imports: [CommonModule, TurnoRoutingModule, SharedModule],
})
export class TurnoModule {}
