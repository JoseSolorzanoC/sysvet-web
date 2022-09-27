import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ListMascotasComponent } from './components/list-mascotas/list-mascotas.component';
import { MascotasRoutingModule } from './mascotas-routing.module';
import { FormMascotasComponent } from './components/form-mascotas/form-mascotas.component';
import { MascotaInfoComponent } from './components/mascota-info/mascota-info.component';

@NgModule({
    declarations: [ListMascotasComponent, FormMascotasComponent, MascotaInfoComponent],
    imports: [CommonModule, MascotasRoutingModule, SharedModule],
})
export class MascotasModule {}
