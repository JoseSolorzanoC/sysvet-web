import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormConsultaClinicaComponent } from './components/form-consulta-clinica/form-consulta-clinica.component';
import { ListConsultaClinicaComponent } from './components/list-consulta-clinica/list-consulta-clinica.component';

const routes: Routes = [
    {
        path: '',
        component: ListConsultaClinicaComponent,
    },
    {
        path: 'nueva',
        component: FormConsultaClinicaComponent,
    },
    {
        path: 'ver/:id',
        component: FormConsultaClinicaComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConsultaClinicaRoutingModule {}
