import { HttpApiService } from './../../api/http-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './../../shared/services/sidenav.service';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  //sidenav: NavItem[] = sidenav

  @ViewChild('sidenav')
  public sidenav!: MatSidenav;

  // private sidenav: MatSidenav;


  constructor(
    private sidenavService: SidenavService,
    private HttpApiService: HttpApiService,
  ) { }

  userJson: any
  userToken:any
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  close(): void {
    this.sidenav.close();
  }



}
