import { Component, OnInit } from '@angular/core';
import {IAsideMenu,AsideMenuService} from '../../core/services/aside-menu.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  asideMenuList:IAsideMenu[];

  constructor(private _asideMenuService: AsideMenuService){
    this.asideMenuList=_asideMenuService.getAsideMenu();
  }

  ngOnInit(): void {

  }

}
