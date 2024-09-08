import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductos } from 'src/app/Interfaces/IProductos';
import { ProductosService } from 'src/app/Services/productos.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevoproducto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevoproducto.component.html',
  styleUrl: './nuevoproducto.component.scss'
})


export class NuevoproductoComponent implements OnInit {

  frm_Productos = new FormGroup({
    Codigo_Barras: new FormControl('', Validators.required),
    Nombre_Producto: new FormControl('', Validators.required),
    Graba_IVA: new FormControl('', Validators.required)
  });
  idProductos = 0;
  titulo = 'Nuevo Producto';
  constructor(
    private productoServicio: ProductosService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}
  

  
  ngOnInit(): void {
    const id = this.ruta.snapshot.paramMap.get('idProducto');
    if (id !== null && !isNaN(parseInt(id, 10))) {
      this.idProductos = parseInt(id,10);
    } else {
      this.idProductos=0;
    }
    console.log(this.idProductos);
    if (this.idProductos > 0) {
        this.productoServicio.uno(this.idProductos).subscribe((uncliente) => {
          console.log(uncliente);
        this.frm_Productos.controls['Codigo_Barras'].setValue(uncliente.Codigo_Barras);
        this.frm_Productos.controls['Nombre_Producto'].setValue(uncliente.Nombre_Producto);
        this.frm_Productos.controls['Graba_IVA'].setValue(uncliente.Graba_IVA.toString());
        this.titulo = 'Editar Producto';
      });
    }
  }

  grabar() {
    let producto: IProductos = {
      idProductos: this.idProductos,
      Codigo_Barras: this.frm_Productos.controls['Codigo_Barras'].value,
      Nombre_Producto: this.frm_Productos.controls['Nombre_Producto'].value,
      Graba_IVA: Number(this.frm_Productos.controls['Graba_IVA'].value),
    };

    Swal.fire({
      title: 'Productos',
      text: '¿Desea guardar el Producto? ' + this.frm_Productos.controls['Nombre_Producto'].value,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.idProductos > 0) {
          this.productoServicio.actualizar(producto).subscribe((res: any) => {
            Swal.fire({
              title: 'Productos',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/producto']);
          });
        } else {
          this.productoServicio.insertar(producto).subscribe((res: any) => {
            Swal.fire({
              title: 'Productos',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/producto']);
          });
        }
      }
    });
  }

}
