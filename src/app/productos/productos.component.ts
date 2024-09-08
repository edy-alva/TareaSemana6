import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IProductos } from '../Interfaces/IProductos';
import { ProductosService } from '../Services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {
  listaproductos: IProductos[] = [];
  constructor(private productoService: ProductosService) {}

  ngOnInit() {
    this.cargatabla();
  }
  cargatabla() {
    this.productoService.todos().subscribe((data) => {
      this.listaproductos = data;
    });
  }

  eliminar(idProductos) {
    Swal.fire({
      title: 'Productos',
      text: '¿Esta seguro que desea eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Producto'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminar(idProductos).subscribe((data) => {
          Swal.fire('Productos', 'El producto ha sido eliminado.', 'success');
          this.cargatabla();
        });
      }
    });
  }

}
