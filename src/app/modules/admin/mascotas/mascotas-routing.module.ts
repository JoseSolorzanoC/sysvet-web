import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMascotasComponent } from './components/list-mascotas/list-mascotas.component';
import { MascotaInfoComponent } from './components/mascota-info/mascota-info.component';

const routes: Routes = [
    {
        path: '',
        component: ListMascotasComponent,
    },
    {
        path: 'info/:id',
        component: MascotaInfoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MascotasRoutingModule {}
