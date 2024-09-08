import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductos } from '../Interfaces/IProductos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  apiurl = 'http://localhost/sexto/apweb/crud/tareaMVC/controllers/productos.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<IProductos[]> {
    return this.lector.get<IProductos[]>(this.apiurl + 'todos');
  }

  uno(idProducto: number): Observable<IProductos> {
    const formData = new FormData();
    formData.append('idProductos', idProducto.toString());
    return this.lector.post<IProductos>(this.apiurl + 'uno', formData);
  }

  eliminar(idProducto: number): Observable<number> {
    const formData = new FormData();
    formData.append('idProductos', idProducto.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(producto: IProductos): Observable<string> {
    const formData = new FormData();
    formData.append('Codigo_Barras', producto.Codigo_Barras);
    formData.append('Nombre_Producto', producto.Nombre_Producto);
    formData.append('Graba_IVA', producto.Graba_IVA.toString());
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(producto: IProductos): Observable<string> {
    const formData = new FormData();
    formData.append('idProductos', producto.idProductos.toString());
    formData.append('Codigo_Barras', producto.Codigo_Barras);
    formData.append('Nombre_Producto', producto.Nombre_Producto);
    formData.append('Graba_IVA', producto.Graba_IVA.toString());
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
