import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMascotasComponent } from './components/list-mascotas/list-mascotas.component';

const routes: Routes = [
    {
        path: '',
        component: ListMascotasComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MascotasRoutingModule {}
