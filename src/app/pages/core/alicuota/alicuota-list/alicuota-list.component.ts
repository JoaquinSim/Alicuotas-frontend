import { Component, OnInit } from '@angular/core';
import { CatalogueModel } from 'src/app/models/catalogue.model';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { DetailService } from 'src/app/services/detail.servie';
import { LoteService } from 'src/app/services/lote.service';
import { TimeService } from 'src/app/services/time.service';
import { ResponseHttpModel } from 'src/app/shared/http.response';
import { CalendarOptions, DurationInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // Importa el plugin de DayGrid
import multiMonthPlugin from '@fullcalendar/multimonth';
import listPlugin from '@fullcalendar/list';
import { DetailModel } from 'src/app/models/detail.model';
@Component({
  selector: 'app-alicuota-list',
  templateUrl: './alicuota-list.component.html',
  styleUrls: ['./alicuota-list.component.css'],
})
export class AlicuotaListComponent implements OnInit {
  protected lote: any[] = [];
  protected user: any[] = [];
  protected time: any[] = [];
  protected catalogues: CatalogueModel[] = [];
  protected year: CatalogueModel[] = [];
  protected mounth: CatalogueModel[] = [];
  protected details: DetailModel[] = [];
  constructor(
    private detailService: DetailService,
    private loteService: LoteService,
    private timeService: TimeService,
    private cataloguesService: CatalogueService
  ) {}
  ngOnInit(): void {
    this.findCatalogeus();
    this.findAll();
    this.filterYaers()
  }

  findAll() {
    this.timeService.findAll().subscribe((response) => {
      this.lote = response.data;
    });
  }

  findDetail() {
    this.detailService.findAll().subscribe((res) => {
      this.details = res.data;
    });
  }

  findLote() {
    this.loteService.findAll().subscribe((res) => {
      this.lote = res.data;
    });
  }

  findCatalogeus() {
    this.cataloguesService.findAll().subscribe((res) => {
      this.catalogues = res.data;
      this.catalogues.forEach((year) =>{
        if(year.code == 'año'){
          this.year.push(year)
          sessionStorage.setItem('year', JSON.stringify(this.year))
        }
      });
      this.catalogues.forEach((mounth) =>{
        if(mounth.code == 'mes'){
          this.mounth.push(mounth)
          sessionStorage.setItem('mounth', JSON.stringify(this.mounth))
        }
      })
    });
  }

  filterYaers(){
    this.year = JSON.parse(String(sessionStorage.getItem('year')));
    console.log(this.year)
    this.mounth = JSON.parse(String(sessionStorage.getItem('mounth')));
    console.log(this.mounth)
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
