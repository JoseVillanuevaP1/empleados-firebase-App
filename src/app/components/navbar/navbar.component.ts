import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private _userService: UserService, private router: Router){

  }

  ngOnInit(): void {
  }

  onClick(){
    this._userService.logOut().then((response)=>{
      this.router.navigate(['/login-empleado'])
    }).catch((error)=>console.log(error))
  }
}
