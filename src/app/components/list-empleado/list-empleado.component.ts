import { Component, OnInit } from '@angular/core';
import { onSnapshot } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css'],
})
export class ListEmpleadoComponent implements OnInit {
  empleados: any[] = [];

  constructor(
    private _empleadoService: EmpleadoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    onSnapshot(this._empleadoService.getEmpleados(), async (querySnapshot) => {
      this.empleados = [];
      await querySnapshot.forEach((doc) => {
        this.empleados.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log(this.empleados)
    });
  }

  eliminarEmpleado(id: string) {
    this._empleadoService
      .eliminarEmpleado(id)
      .then(() => {
        console.log('Empleado eliminado con éxito');
        this.toastr.error(
          'El empleado fue eliminado con exito',
          'Registro Eliminado!',
          {
            positionClass: 'toast-bottom-right',
          }
        );
      })
      .catch((error) => console.log(error));
  }
}
