import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTurnosComponent } from './components/list-turnos/list-turnos.component';

const routes: Routes = [
    {
        path: '',
        component: ListTurnosComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TurnoRoutingModule {}
