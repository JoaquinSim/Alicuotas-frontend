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
  detail: DetailModel;
  catagues: CatalogueModel[] = []
  pays: CatalogueModel[] = []
  constructor(
    private formBuilder: FormBuilder,
    private loteService: LoteService,
    private route: Router,
    private userService: UsersHttpService,
    private catalogueService: CatalogueService,
    private timeService: TimeService,
    private detailService: DetailService
  ) {
    this.form = this.newForm();
    this.findLotes();
    this.findLote();
    this.findCatalogues();
  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      pay: [null, [Validators.required]],
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
      localStorage.setItem('idD', JSON.stringify(this.lote.time.detail.id));
      this.detailService.findOne(this.lote.time.detail.id).subscribe((res) =>{
        this.detail = res
        console.log(this.detail)
        this.form.patchValue(res); 
      })
    })
  }

  findCatalogues(){
    this.catalogueService.findAll().subscribe((res) =>{
      this.catagues = res.data
      this.catagues.forEach((pay) => {
        if(pay.code === 'pay'){
          this.pays.push(pay)
        }
      })
    })
  }

  update(detail: DetailModel) {
    this.id = JSON.parse(String(localStorage.getItem('idD')));
    this.detailService.update(this.id, detail).subscribe(() => {
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
    } 
  }
}
