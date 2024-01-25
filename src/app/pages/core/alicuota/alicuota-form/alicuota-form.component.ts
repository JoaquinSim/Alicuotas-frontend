import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogueModel } from 'src/app/models/catalogue.model';
import { LoteModel } from 'src/app/models/lote.model';
import { TimeModel } from 'src/app/models/time.model';
import { UserModel } from 'src/app/models/user.model';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { LoteService } from 'src/app/services/lote.service';
import { TimeService } from 'src/app/services/time.service';
import { UsersHttpService } from 'src/app/services/user.service';

@Component({
  selector: 'app-alicuota-form',
  templateUrl: './alicuota-form.component.html',
  styleUrls: ['./alicuota-form.component.css'],
})
export class AlicuotaFormComponent {
  id?: any;
  form: FormGroup;
  lote: LoteModel[] = [];
  lotes: LoteModel[] = [];
  users: UserModel[] = [];
  years: CatalogueModel[] = [];
  yearss: CatalogueModel[] = [];
  mounths: CatalogueModel[] = [];
  mounthss: CatalogueModel[] = [];
  userId: any[] | undefined;
  time: TimeModel[] = []

  constructor(
    private formBuilder: FormBuilder,
    private loteService: LoteService,
    private route: Router,
    private userService: UsersHttpService,
    private catalogueService: CatalogueService,
    private timeService: TimeService
  ) {
    this.form = this.newForm();
    this.findLotes();
    this.findUsers();
    this.findYears();
    this.findMounths()
    this.findLote()
    this.findTime()
  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      number: [null, [Validators.required]],
      time: [null, [Validators.required]],
    });
  }

  findUsers() {
    this.userService.findAll().subscribe((res) => {
      this.users = res.data;
    });
  }

  findYears() {
    this.catalogueService.findAll().subscribe((res) => {
      this.years = res.data;
      this.years.forEach((code) => {
        if (code.code === 'año') {
          this.yearss.push(code)
          this.yearss.sort((a, b) => a.sort - b.sort);
        }
      });
    });
  }

  findMounths() {
    this.catalogueService.findAll().subscribe((res) => {
      this.mounths = res.data;
      this.mounths.forEach((code) => {
        if (code.code === 'mes') {
          this.mounthss.push(code)
          this.mounthss.sort((a, b) => a.sort - b.sort);
        }
      });
    });
  }

  findLotes() {
    this.loteService.findAll().subscribe((res) =>{
      this.lotes = res.data      
    })
  }

  findLote(){
    this.id = JSON.parse(String(localStorage.getItem('id')));
    this.loteService.findOne(this.id).subscribe((res) =>{
      this.lote.push(res)     
      console.log(this.lote)
      this.form.patchValue(res); 
    })
  }

  findTime(){
    this.timeService.findAll().subscribe((res) =>{
      this.time = res.data
      console.log(this.time)
    })
  }

  create(lote: LoteModel) {
    this.loteService.create(lote).subscribe(() => {
      this.form.reset();
      this.close();
    });
  }

  update(lote: LoteModel) {
    this.id = JSON.parse(String(localStorage.getItem('id')));
    this.loteService.update(this.id, lote).subscribe(() => {
      this.form.reset();
      this.close();
    });
  }

  close() {
    localStorage.removeItem('id');
    this.route.navigate(['dashboard/ali']);
  }

  onSubmit() {
    if (this.id) {
      this.update(this.form.value);
    } else {
      this.create(this.form.value);
    }
  }
}
