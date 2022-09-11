import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ListMascotasComponent } from './components/list-mascotas/list-mascotas.component';
import { MascotasRoutingModule } from './mascotas-routing.module';
import { FormMascotasComponent } from './components/form-mascotas/form-mascotas.component';

@NgModule({
    declarations: [ListMascotasComponent, FormMascotasComponent],
    imports: [CommonModule, MascotasRoutingModule, SharedModule],
})
export class MascotasModule {}
