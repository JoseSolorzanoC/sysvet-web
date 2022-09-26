import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ListProductosComponent } from './components/list-productos/list-productos.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormProductoComponent } from './components/form-producto/form-producto.component';

@NgModule({
    declarations: [ListProductosComponent, FormProductoComponent],
    imports: [CommonModule, ProductosRoutingModule, SharedModule],
})
export class ProductosModule {}
