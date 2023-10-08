import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLog: FormGroup;
  submitted = false;
  login = 'yes';
  constructor(private df: FormBuilder, private _serviceRegister: UserService,private router: Router, private toastr: ToastrService) {
    this.formLog = this.df.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  onSumbit() {
    this.submitted = true;
    if (this.formLog.invalid) {
      return;
    } else {
      this._serviceRegister
        .login(this.formLog.value)
        .then((response) => {
          console.log(response);
          this.router.navigate(['/list-empleados']);
        })
        .catch((error) =>
        this.toastr.error(
          'Por favor, verifique sus credenciales',
          'Usuario o contraseña Incorrecta!',
          {
            positionClass: 'toast-bottom-right',
          }
        )
      );
    }
  }

  onClick(){
    this._serviceRegister.loginWithGoogle().then((response)=>{
      this.router.navigate(['/list-empleados'])
    }).catch((error)=>console.log(error))
  }

}
