import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoteModel } from 'src/app/models/lote.model';
import { LoteService } from 'src/app/services/lote.service';

@Component({
  selector: 'app-lote-form',
  templateUrl: './lote-form.component.html',
  styleUrls: ['./lote-form.component.css']
})
export class LoteFormComponent {
  id?: any; 
  form: FormGroup;
  lote?: LoteModel;

  constructor(
    private formBuilder: FormBuilder,
    private loteService: LoteService,
    private route: Router
  ) {
    this.form = this.newForm();
    this.findUser()
  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      number: [null, [Validators.required]],
    });
  }

  findUser(){
    this.id = JSON.parse(String(localStorage.getItem('id')));
    this.loteService.findOne(this.id).subscribe((res) =>{
      console.log(res)
      this.lote = res
      this.form.patchValue(res);
    })
  }

  create(lote: LoteModel){
    this.loteService.create(lote).subscribe(() => {
      this.form.reset();
      this.close();
    });
  }

  update(lote: LoteModel){
    this.id = JSON.parse(String(localStorage.getItem('id')));
    this.loteService.update(this.id, lote).subscribe(() => {
      this.form.reset();
      this.close()
    });
  }

  close(){
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
