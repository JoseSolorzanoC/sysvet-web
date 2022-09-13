import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MiInformacionComponent } from './components/mi-informacion/mi-informacion.component';
import { UsuarioRoutingModule } from './usuario-routing.module';

@NgModule({
    declarations: [MiInformacionComponent],
    imports: [CommonModule, SharedModule, UsuarioRoutingModule],
})
export class UsuarioModule {}
