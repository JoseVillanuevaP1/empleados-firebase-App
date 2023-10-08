import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formReg: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private _serviceRegister: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.formReg = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSumbit() {
    this.submitted = true;
    if (this.formReg.invalid) {
      return;
    } else {
      this._serviceRegister
        .register(this.formReg.value)
        .then((response) => {
          console.log(response);
          this.router.navigate(['/login-empleado']);
        })
        .catch((error) =>
          this.toastr.error(
            'El usuario ya esta registrado',
            'Usuario ya registrado',
            {
              positionClass: 'toast-bottom-right',
            }
          )
        );
    }
  }
}
