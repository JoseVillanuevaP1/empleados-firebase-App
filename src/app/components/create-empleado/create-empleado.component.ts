import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';
import { doc, onSnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css'],
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Empleado';

  constructor(
    private fb: FormBuilder,
    private _empleadosService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarEmpleado() {
    this.submitted = true;
    if (this.createEmpleado.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarEmpleado();
    } else {
      this.editarEmpleado(this.id);
    }
  }

  editarEmpleado(id: string) {
    this.loading = true;
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaActualizacion: new Date(),
    };
    this._empleadosService.actualizarEmpleado(id, empleado).then(() => {
      this.loading = false;
      this.toastr.info(
        'El empleado fue modificado con éxito',
        'Empleado modificado',
        {
          positionClass: 'toast-bottom-right',
        }
      );
    });
    this.router.navigate(['/list-empleados']);
  }

  agregarEmpleado() {
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };
    this.loading = true;
    this._empleadosService
       .agregarEmpleado(empleado)
      .then(() => {
        this.toastr.success(
          'El empleado fue registrado con Exito!',
          'Empleado Registrado',
          { positionClass: 'toast-bottom-right' }
        );
        this.loading = false;
        this.router.navigate(['/list-empleados']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  async esEditar() {
    if (this.id != null) {
      this.titulo = "Editar Empleado"
      this.loading = true;
      const data = this._empleadosService.getEmpleado(this.id);
      data.then((response) => {
        if (response != null) {
          this.loading = false;
          this.createEmpleado.setValue({
            nombre: response['nombre'],
            apellido: response['apellido'],
            documento: response['documento'],
            salario: response['salario'],
          });
        }
      });
    }
  }
}
