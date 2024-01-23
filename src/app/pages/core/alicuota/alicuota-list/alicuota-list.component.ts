import { Component, OnInit } from '@angular/core';
import { CatalogueModel } from 'src/app/models/catalogue.model';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { DetailService } from 'src/app/services/detail.servie';
import { LoteService } from 'src/app/services/lote.service';
import { TimeService } from 'src/app/services/time.service';
import { DetailModel } from 'src/app/models/detail.model';
import { TimeModel } from 'src/app/models/time.model';
import { LoteModel } from 'src/app/models/lote.model';

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
  constructor(
    private detailService: DetailService,
    private loteService: LoteService,
    private timeService: TimeService,
    private cataloguesService: CatalogueService,
  ) {}
  ngOnInit(): void {
    this.findCatalogeus();
    this.findAll();
    this.filterYaers()
    this.findLotes()
  }

  findAll() {
    this.timeService.findAll().subscribe((response) => {
      this.time = response.data;
      this.time.sort((a, b) => a.year.sort - b.detail.mounth.sort);    });
  }

  findDetail() {
    this.detailService.findAll().subscribe((res) => {
      this.details = res.data;
    });
  }

  findCatalogeus() {
    this.cataloguesService.findAll().subscribe((res) => {
      this.catalogues = res.data;
      this.catalogues.forEach((year) =>{
        if(year.code == "año"){
          this.catalogues.push(year)
          localStorage.setItem('year', JSON.stringify(this.catalogues))
        }
      });
      this.catalogues.forEach((mounth) =>{
        if(mounth.code == "mes"){
          this.catalogues.push(mounth)
          localStorage.setItem('mounth', JSON.stringify(this.catalogues))
        }
      })
    });
  }

  filterYaers(){
    this.year = JSON.parse(String(localStorage.getItem('year')));
    this.year.sort((a, b) => a.sort - b.sort);
    this.mounth = JSON.parse(String(localStorage.getItem('mounth')));
    this.mounth.sort((a, b) => a.sort - b.sort);
  }
  

  findLotes(){
    this.loteService.findAll().subscribe((res) => {
      this.lote = res.data;
      this.lote.sort((a, b) => a.time.detail.mounth.sort - b.time.year.sort);
      console.log(this.lote)

    });
  }
  // calendarOptions: CalendarOptions = {
  //   plugins: [multiMonthPlugin],
  //   initialView: 'multiMonthFourMonth',
  //   views: {
  //     multiMonthFourMonth: {
  //       type: 'multiMonth',
  //       duration: { months: 12 },
  //     },
  //   },
  //   headerToolbar: {
  //     left: 'prev,next',
  //     center: 'title',
  //     right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek,listDay',
  //   },
  // };
}
