import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedida';
import { UnidadmedidaService } from '../../Services/unidadmedida.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevaunidadmedida',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './nuevaunidadmedida.component.html',
  styleUrl: './nuevaunidadmedida.component.scss'
})
export class NuevaunidadmedidaComponent implements OnInit {
  titulo = 'Nueva Unidad de Medida';
  frm_UnidadMedida = new FormGroup({
    Detalle: new FormControl('', [Validators.required]),
    Tipo: new FormControl('', [Validators.required])
  });

  idUnidadMedida = 0;
  constructor(
    private unidadService: UnidadmedidaService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const id = this.ruta.snapshot.paramMap.get('idUnidad_Medida');
    if (id !== null && !isNaN(parseInt(id, 10))) {
      this.idUnidadMedida = parseInt(id,10);
    } else {
      this.idUnidadMedida=0;
    }
    if (this.idUnidadMedida > 0) {
      this.unidadService.uno(this.idUnidadMedida).subscribe((unUnidadMedida) => {
        this.frm_UnidadMedida.controls['Detalle'].setValue(unUnidadMedida.Detalle);
        this.frm_UnidadMedida.controls['Tipo'].setValue(unUnidadMedida.Tipo.toString());
        this.titulo = 'Editar Unidad de Medida';
      });
    }
  }

  cambio(objetoSleect: any) {
    this.frm_UnidadMedida.get('Tipo')?.setValue(objetoSleect.target.value);
  }
  grabar() {
    
    let tipo: number = Number(this.frm_UnidadMedida.get('Tipo')?.value);
    let unidadmedida: IUnidadMedida = {
      Detalle: this.frm_UnidadMedida.get('Detalle')?.value,
      Tipo: tipo
    };
    console.log('ID: '+ this.idUnidadMedida);
    if (this.idUnidadMedida == 0) {
      console.log('insertar');
      this.unidadService.insertar(unidadmedida).subscribe((x) => {
        Swal.fire('Exito', 'La unidad de medida se grabo con exito', 'success');
        this.navegacion.navigate(['/unidadmedida']);
      });
    } else {
      console.log('actualizar');
      unidadmedida.idUnidad_Medida = this.idUnidadMedida;
      this.unidadService.actualizar(unidadmedida).subscribe((x) => {
        Swal.fire('Exito', 'La unidad de medida se modifico con exito', 'success');
        this.navegacion.navigate(['/unidadmedida']);
      });
    }
  }
}
