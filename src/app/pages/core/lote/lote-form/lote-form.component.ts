import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogueModel } from 'src/app/models/catalogue.model';
import { DetailModel } from 'src/app/models/detail.model';
import { LoteModel } from 'src/app/models/lote.model';
import { TimeModel } from 'src/app/models/time.model';
import { UserModel } from 'src/app/models/user.model';
import { DetailService } from 'src/app/services/detail.servie';
import { LoteService } from 'src/app/services/lote.service';
import { TimeService } from 'src/app/services/time.service';
import { UsersHttpService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lote-form',
  templateUrl: './lote-form.component.html',
  styleUrls: ['./lote-form.component.css'],
})
export class LoteFormComponent {
  id?: any;
  number?: any;
  form: FormGroup;
  detail: FormGroup;
  lote?: LoteModel;
  lotes?: LoteModel[] = [];
  user: UserModel;
  users: UserModel[] = [];
  time: TimeModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loteService: LoteService,
    private route: Router,
    private userService: UsersHttpService,
    private timeService: TimeService,
    private detailService: DetailService
  ) {
    this.form = this.newForm();
    this.detail = this.detailForm();
    this.findUser();
    this.findUsers();
    this.findTime();
    this.findDetail()
  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      number: [null, [Validators.required]],
      user: [null, [Validators.required]],
      time: [null, [Validators.required]],
    });
  }

  detailForm(): FormGroup {
    return this.formBuilder.group({
      mount: [null, [Validators.required]],
    });
  }

  findUsers() {
    this.userService.findAll().subscribe((res) => {
      this.users = res.data;
    });
  }

  findUser() {
    this.id = JSON.parse(String(localStorage.getItem('id')));
    this.loteService.findOne(this.id).subscribe((res) => {
      this.lote = res;
      localStorage.setItem('number', JSON.stringify(this.lote.number));
      this.form.patchValue(res);
    });
  }

  findDetail() {
    this.id = JSON.parse(String(localStorage.getItem('id')));
    this.loteService.findOne(this.id).subscribe((res) => {
      this.lote = res;
      this.detail.patchValue(this.lote.time.detail);
    });
  }

  findTime() {
    this.timeService.findAll().subscribe((res) => {
      this.time = res.data;
    });
  }

  create(lote: LoteModel) {
    let usuario: UserModel;
    this.loteService.findAll().subscribe((res) => {
      this.lotes = res.data;
      this.lotes.forEach((num) => {
        if (lote.number == num.number) {
          usuario = num.user;
          console.log(usuario);
          if (lote.user.id == usuario.id) {
            alert('La propiedad ya esta ocupada');
          } else {
            console.log(lote);
            this.loteService.create(lote).subscribe(() => {
              this.form.reset();
              this.close();
            });
          }
        }
      });
    });
  }

  update(lote: LoteModel) {
    // this.id = JSON.parse(String(localStorage.getItem('id')));
    // this.loteService.findOne(this.id).subscribe((res) => {
    //   this.lote = res;
    //   if (this.lote.number == lote.number) {
    //     alert('es su mismo lote');
    //   }
    // });
    this.loteService.update(this.id, lote).subscribe(() => {
      this.form.reset();
      this.close();
    });
  }

  updateMoutn() {
    this.id = JSON.parse(String(localStorage.getItem('id')));
    this.loteService.findOne(this.id).subscribe((res) => {
      this.lote = res;
      console.log(this.detail.value);
      this.detailService
        .update(this.lote.time.detail.id, this.detail.value)
        .subscribe(() => {});
    });
  }

  close() {
    localStorage.removeItem('id');
    this.route.navigate(['dashboard/lote']);
  }

  onSubmit() {
    if (this.id) {
      this.update(this.form.value);
    } else {
      this.create(this.form.value);
    }
  }
}
