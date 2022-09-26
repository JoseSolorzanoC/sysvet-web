import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SharedService } from 'app/shared/shared.service';
import { ProductosService } from '../../services/productos.service';
import { FormProductoComponent } from '../form-producto/form-producto.component';

@Component({
    selector: 'app-list-productos',
    templateUrl: './list-productos.component.html',
    styleUrls: ['./list-productos.component.scss'],
})
export class ListProductosComponent implements OnInit {
    productos: any[] = [];
    isLoading = true;

    constructor(
        private productosService: ProductosService,
        private matDialog: MatDialog,
        private fuseConfirmationService: FuseConfirmationService,
        private sharedService: SharedService
    ) {
        this.getProductosList();
    }

    openNewProductoModal(): void {
        this.matDialog
            .open(FormProductoComponent, {
                disableClose: true,
                panelClass: ['w-full', 'md:w-2/4', 'lg:w-2/5', 'xl:w-1/4'],
            })
            .afterClosed()
            .subscribe((res) => {
                this.getProductosList();
            });
    }

    openUpdateProductoModal(producto: any): void {
        this.matDialog
            .open(FormProductoComponent, {
                disableClose: true,
                panelClass: ['w-full', 'md:w-2/4', 'lg:w-2/5', 'xl:w-1/4'],
                data: producto,
            })
            .afterClosed()
            .subscribe((res) => {
                this.getProductosList();
            });
    }

    ngOnInit(): void {}

    getProductosList(): void {
        this.isLoading = true;
        this.productosService.getAllProductos().subscribe((productos) => {
            this.isLoading = false;
            this.productos = productos;
        });
    }

    deleteProductoById(productId: string): void {
        this.fuseConfirmationService
            .open({
                title: 'alerts.you_sure_delete_label',
                message: 'alerts.you_sure_delete_message',
                actions: {
                    confirm: {
                        color: 'warn',
                        label: 'buttons.yes',
                        show: true,
                    },
                    cancel: {
                        label: 'buttons.no',
                        show: true,
                    },
                },
                dismissible: false,
            })
            .afterClosed()
            .subscribe((res) => {
                if (res === 'confirmed') {
                    this.isLoading = true;
                    this.productosService.deleteProducto(productId).subscribe(
                        () => {
                            this.isLoading = false;
                            this.getProductosList();
                            this.sharedService.showAlert('alerts.delete_ok');
                        },
                        () => {
                            this.isLoading = false;
                            this.sharedService.showAlert('alerts.delete_error');
                        }
                    );
                }
            });
    }
}
