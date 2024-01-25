import { Component, OnInit } from '@angular/core';
import { CatalogueModel } from 'src/app/models/catalogue.model';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { DetailService } from 'src/app/services/detail.servie';
import { LoteService } from 'src/app/services/lote.service';
import { TimeService } from 'src/app/services/time.service';
import { DetailModel } from 'src/app/models/detail.model';
import { TimeModel } from 'src/app/models/time.model';
import { LoteModel } from 'src/app/models/lote.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alicuota-list',
  templateUrl: './alicuota-list.component.html',
  styleUrls: ['./alicuota-list.component.css'],
})
export class AlicuotaListComponent implements OnInit {
  protected time: TimeModel[] = [];
  protected lote: LoteModel[] = [];
  protected user: any[] = [];
  protected catalogues: CatalogueModel[] = [];
  protected year: CatalogueModel[] = [];
  protected mounth: CatalogueModel[] = [];
  protected details: DetailModel[] = [];
  protected mounths: any[] = [];

  constructor(
    private detailService: DetailService,
    private loteService: LoteService,
    private timeService: TimeService,
    private cataloguesService: CatalogueService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.findCatalogeus();
    this.findAll();
    this.filterYaers();
    this.findLotes();
    this.filterMounths();
    this.findDetail()
  }

  findAll() {
    this.timeService.findAll().subscribe((response) => {
      this.time = response.data;
      this.time.sort((a, b) => a.year.sort - b.detail.mounth.sort);
    });
  }

  findDetail() {
    this.detailService.findAll().subscribe((res) => {
      this.details = res;
      this.details.forEach((pay) =>{
        if(pay.pay === false){
          this.mounths.push(pay)
        }
      })
    });
  }

  findCatalogeus() {
    this.cataloguesService.findAll().subscribe((res) => {
      this.catalogues = res.data;
      this.catalogues.forEach((year) => {
        if (year.code == 'año') {
          this.catalogues.push(year);
          localStorage.setItem('year', JSON.stringify(this.catalogues));
        }
      });
      this.catalogues.forEach((mounth) => {
        if (mounth.code == 'mes') {
          this.catalogues.push(mounth);
          localStorage.setItem('mounth', JSON.stringify(this.catalogues));
        }
      });
    });
  }

  filterYaers() {
    this.year = JSON.parse(String(localStorage.getItem('year')));
    this.year.sort((a, b) => a.sort - b.sort);
    this.mounth = JSON.parse(String(localStorage.getItem('mounth')));
    this.mounth.sort((a, b) => a.sort - b.sort);
  }

  filterMounths() {

  }

  findLotes() {
    this.loteService.findAll().subscribe((res) => {
      this.lote = res.data;
      this.lote.sort((a, b) => a.time.detail.mounth.sort - b.time.year.sort);
    });
  }

  crear() {
    this.route.navigate(['dashboard/ali/form']);
  }

  updateAlicuota(id: string) {
    localStorage.setItem('id', JSON.stringify(id));
    this.route.navigate(['dashboard/ali/form']);
  }
}
