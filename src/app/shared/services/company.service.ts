import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public selectedCompany: any;
  constructor() { }

  changeCompany(company: any) {
    this.selectedCompany = company;
  }

  changeCompanyToAll() {
    this.selectedCompany = null;
  }
}
