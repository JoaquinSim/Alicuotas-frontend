import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogueModel } from 'src/app/models/catalogue.model';
import { LoteModel } from 'src/app/models/lote.model';
import { UserModel } from 'src/app/models/user.model';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { LoteService } from 'src/app/services/lote.service';
import { UsersHttpService } from 'src/app/services/user.service';

@Component({
  selector: 'app-alicuota-form',
  templateUrl: './alicuota-form.component.html',
  styleUrls: ['./alicuota-form.component.css'],
})
export class AlicuotaFormComponent {
  id?: any;
  form: FormGroup;
  lote: LoteModel;
  lotes: LoteModel[] = [];
  users: UserModel[] = [];
  years: CatalogueModel[] = [];
  yearss: CatalogueModel[] = [];
  mounths: CatalogueModel[] = [];
  mounthss: CatalogueModel[] = [];
  userId: any[] | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private loteService: LoteService,
    private route: Router,
    private userService: UsersHttpService,
    private catalogueService: CatalogueService
  ) {
    this.form = this.newForm();
    this.findLotes();
    this.findUsers();
    this.findYears();
    this.findMounths()
    this.findLote()
  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      number: [null, [Validators.required]],
      year: [null, [Validators.required]],
      mounth: [null, [Validators.required]],
      mount: [null, [Validators.required]],
      user: [null, [Validators.required]],
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
      this.lote = res      
      this.form.patchValue(res); 
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
