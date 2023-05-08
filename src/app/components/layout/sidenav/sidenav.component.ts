import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sidenav } from './../../../shared/data/sidenav/sidenav.const';
import { NavItem } from './../../../shared/models/nav-item';
import { SidenavService } from './../../../shared/services/sidenav.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  exportAs: 'menuInOtherComponent',
})
export class SidenavComponent implements OnInit {

  sidenav: NavItem[] = sidenav;
  openedChild: number | undefined;
  openedSecendChild: number | undefined;
  openedthirdChild: number | undefined;
  constructor(
    private sidenavServ: SidenavService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  checkIsHome(path: string) {
    if (path !== '/') {
      return;
    }
    return this.router.url.includes('/dashboard');
  }

  openChildren(index: number): void {
    if (this.openedChild === index) {
      return this.openedChild = undefined;
    }
    this.openedChild = index;
  }

  openSecendChildren(index: number): void {
    if (this.openedSecendChild === index) {
      return this.openedSecendChild = undefined;
    }
    this.openedSecendChild = index;
  }

  closeSidenav() {
    this.sidenavServ.close();
  }

  opened() {
    console.log('芝麻開門');
  }

  closed() {
    console.log('芝麻關門');
  }
}
