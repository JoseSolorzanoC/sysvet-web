import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { FormConsultaClinicaComponent } from './components/form-consulta-clinica/form-consulta-clinica.component';
import { ConsultaClinicaRoutingModule } from './consulta-clinica-routing.module';
import { FormItemRecetaComponent } from './components/form-item-receta/form-item-receta.component';
import { ListConsultaClinicaComponent } from './components/list-consulta-clinica/list-consulta-clinica.component';

@NgModule({
    declarations: [FormConsultaClinicaComponent, FormItemRecetaComponent, ListConsultaClinicaComponent],
    imports: [CommonModule, ConsultaClinicaRoutingModule, SharedModule],
})
export class ConsultaClinicaModule {}
