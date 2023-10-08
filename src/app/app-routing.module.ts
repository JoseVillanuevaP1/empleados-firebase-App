import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmpleadoComponent } from './components/list-empleado/list-empleado.component';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [

  { path: '', redirectTo:'login-empleado', pathMatch:'full' },
  { path: 'register-empleado', component: RegisterComponent},
  { path: 'login-empleado', component: LoginComponent},
  { path: 'list-empleados', component: ListEmpleadoComponent, ...canActivate(()=>redirectUnauthorizedTo(['/login-empleado']))},
  { path: 'create-empleado', component: CreateEmpleadoComponent},
  { path: 'editEmpleado/:id', component: CreateEmpleadoComponent},
  { path: '**', redirectTo:'login-empleado', pathMatch:'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
