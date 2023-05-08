import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sidenav } from './../../../shared/data/sidenav/sidenav.const';
import { NavItem } from './../../../shared/models/nav-item';
import { SidenavService } from './../../../shared/services/sidenav.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  sidenav: NavItem[] = sidenav;
  openedChild: number | undefined;
  openedSecendChild: number | undefined;
  openedthirdChild: number | undefined;
  constructor(
    private sidenavServ: SidenavService,
    private router: Router
  ) { }

  values="2015-2019 © HTA | 竑騰科技股份有限公司，高雄楠梓加工出口區經六路61號\n電話:07-3631000 | 傳真:07-3686640\n建議使用Google Chrome版本，最佳瀏覽解析度為1024*768\n系統最後版本：2019.03.31"
  values2=`
  2015-2019 © HTA | 竑騰科技股份有限公司，高雄楠梓加工出口區經六路61號
  電話:07-3631000 | 傳真:07-3686640
  建議使用Google Chrome版本，最佳瀏覽解析度為1024*768
  系統最後版本：2019.03.31`
  ngOnInit(): void {

  }

}
