import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMedicosComponent } from './components/list-medicos/list-medicos.component';

const routes: Routes = [
    {
        path: '',
        component: ListMedicosComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MedicosRoutingModule {}
