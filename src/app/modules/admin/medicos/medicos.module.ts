import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { FormMedicosComponent } from './components/form-medicos/form-medicos.component';
import { ListMedicosComponent } from './components/list-medicos/list-medicos.component';
import { MedicosRoutingModule } from './medicos-routing.module';

@NgModule({
    declarations: [ListMedicosComponent, FormMedicosComponent],
    imports: [CommonModule, MedicosRoutingModule, SharedModule],
})
export class MedicosModule {}
