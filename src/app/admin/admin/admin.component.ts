import { Component, OnInit } from '@angular/core';
import { TokenStoreService } from '../../_services/token-store.service';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/shared/services/sidenav.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private tokenStore: TokenStoreService, 
    private authService: AuthService, 
    private router: Router,
    private sidenav: SidenavService,) { }

  ngOnInit(): void {
  }

  logout(): void {
    /*
    this.tokenStore.signOut();
    this.authService.logout();
    this.router.navigate(['login']);*/
  }

  toggleRightSidenav() {
    this.sidenav.toggle();
  }
}
