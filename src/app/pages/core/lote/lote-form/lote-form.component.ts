import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogueModel } from 'src/app/models/catalogue.model';
import { DetailModel } from 'src/app/models/detail.model';
import { LoteModel } from 'src/app/models/lote.model';
import { TimeModel } from 'src/app/models/time.model';
import { UserModel } from 'src/app/models/user.model';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { DetailService } from 'src/app/services/detail.servie';
import { LoteService } from 'src/app/services/lote.service';
import { TimeService } from 'src/app/services/time.service';
import { UsersHttpService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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
  timefomr: FormGroup;
  lote?: LoteModel;
  lotes?: LoteModel[] = [];
  user: UserModel;
  users: UserModel[] = [];
  time: TimeModel[] = [];
  catalogues: CatalogueModel[] = [];
  years: CatalogueModel[] = [];
  mounths: CatalogueModel[] = [];
  pay: CatalogueModel;

  constructor(
    private formBuilder: FormBuilder,
    private loteService: LoteService,
    private route: Router,
    private userService: UsersHttpService,
    private timeService: TimeService,
    private detailService: DetailService,
    private catalogueService: CatalogueService
  ) {
    this.form = this.newForm();
    this.detail = this.detailForm();
    this.timefomr = this.timeForm();
    this.findUser();
    this.findUsers();
    this.findTime();
    this.findDetail();
  }

  detailForm(): FormGroup {
    return this.formBuilder.group({
      mounth: [null, [Validators.required]],
      mount: [null, [Validators.required]],
      code: ['new', [Validators.required]],
      pay: [
        {
          id: 'cbe3edb5-0a10-4b3b-9a33-8dbd91c29680',
          createdAt: '2024-01-26T03:45:48.117Z',
          updatedAt: '2024-01-26T03:45:48.117Z',
          deletedAt: null,
          parentId: null,
          code: 'pay',
          name: 'Sin pagar',
          sort: 2,
        },

        [Validators.required],
      ],
    });
  }

  timeForm(): FormGroup {
    return this.formBuilder.group({
      year: [null, [Validators.required]],
      detail: [],
    });
  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      number: [null, [Validators.required]],
      user: [null, [Validators.required]],
      time: [],
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
    this.catalogueService.findAll().subscribe((res) => {
      this.catalogues = res.data;
      this.catalogues.forEach((time) => {
        if (time.code === 'año') {
          this.years.push(time);
          this.years.sort((a, b) => a.sort - b.sort);
        }

        if (time.code === 'mes') {
          this.mounths.push(time);
          this.mounths.sort((a, b) => a.sort - b.sort);
        }

        if (time.name === 'Sin pagar') {
          this.pay = time;
          console.log(time);
        }
      });
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
            this.loteService.create(lote).subscribe((res) => {
              this.form.reset();
              this.form.patchValue(res.data);
              localStorage.removeItem('idDetail');
              localStorage.removeItem('time');
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

  updateMount() {
    this.id = JSON.parse(String(localStorage.getItem('id')));
    Swal.fire({
      title: 'Agregar monto?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.loteService.findOne(this.id).subscribe((res) => {
          this.lote = res;
          this.detailService
            .update(this.lote.time.detail.id, this.detail.value)
            .subscribe(() => {
              Swal.fire('Monto agregado!', '', 'success');
            });
        });
      } else if (result.isDenied) {
        Swal.fire('Cancelado', '', 'info');
      }
    });
  }

  createTIme() {
    let detailId = JSON.parse(
      String(localStorage.getItem('idDetail'))
    ) as DetailModel;
    this.timefomr.value.detail = detailId
    this.timeService.create(this.timefomr.value).subscribe((res) => {
      this.form.patchValue(res.data);
      document.getElementById('time').style.display = 'none';
      localStorage.setItem('time', JSON.stringify(res));
    });
  }

  createDetail() {
    this.detailService.create(this.detail.value).subscribe((res) => {
      this.form.patchValue(res);
      document.getElementById('detail').style.display = 'none';
      localStorage.setItem('idDetail', JSON.stringify(res));
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
      if (this.form.valid) {
        let timeId = JSON.parse(String(localStorage.getItem('time'))) as TimeModel;
        this.form.value.time = timeId
        this.create(this.form.value);
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Verifique todos los campos',
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      }
    }
  }
}
