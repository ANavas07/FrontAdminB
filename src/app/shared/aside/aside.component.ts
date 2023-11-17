import { Component, OnInit } from '@angular/core';
import {IAsideMenu,AsideMenuService} from '../../core/services/aside-menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  asideMenuList:IAsideMenu[];

  constructor(private _asideMenuService: AsideMenuService, private router:Router){
    this.asideMenuList=_asideMenuService.getAsideMenu();
  }

  logout(){
    const result= confirm("¿Estas seguro de salir de la aplicación?");
    if(result){
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {

  }

}
