import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router:Router){}

  logout(){
    const result= confirm("¿Estas seguro de salir de la aplicación?");
    if(result){
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
}
