import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiInformacionComponent } from './components/mi-informacion/mi-informacion.component';

const routes: Routes = [
    {
        path: '',
        component: MiInformacionComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsuarioRoutingModule {}
