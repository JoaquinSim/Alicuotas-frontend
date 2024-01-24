import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoteModel } from 'src/app/models/lote.model';
import { UserModel } from 'src/app/models/user.model';
import { LoteService } from 'src/app/services/lote.service';
import { UsersHttpService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lote-form',
  templateUrl: './lote-form.component.html',
  styleUrls: ['./lote-form.component.css']
})
export class LoteFormComponent {
  id?: any; 
  form: FormGroup;
  lote?: LoteModel;
  users: UserModel[] = [];
  userId: any[] | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private loteService: LoteService,
    private route: Router,
    private userService: UsersHttpService
  ) {
    this.form = this.newForm();
    this.findUser()
    this.findUsers()
  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      number: [null, [Validators.required]],
      user: [null, [Validators.required]]
    });
  }

  findUsers(){
    this.userService.findAll().subscribe((res) =>{
      this.users = res
    })
  }
  findUser(){
    this.id = JSON.parse(String(localStorage.getItem('id')));
    this.loteService.findOne(this.id).subscribe((res) =>{
      console.log(res)
      this.lote = res
      this.userId = [
        {user : this.users}
      ];
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
