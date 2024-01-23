import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersHttpService } from 'src/app/services/user.service';
import { UserListComponent } from '../user-list/user-list.component';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  id?: any; 
  form: FormGroup;
  user?: UserModel;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersHttpService,
    private route: Router
  ) {
    this.form = this.newForm();
    this.findUser()
  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      // username: ['reviewer', [Validators.required]],
      email: [null, [Validators.required]],
      // password: ['12345678', [Validators.required]],
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      identification: [null, [Validators.required]],
    });
  }

  findUser(){
    this.id = JSON.parse(String(localStorage.getItem('id')));
    this.userService.findOne(this.id).subscribe((res) =>{
      console.log(res)
      this.user = res
      this.form.patchValue(res);
    })
  }

  create(user: UserModel){
    this.userService.create(user).subscribe(() => {
      this.form.reset();
      this.close();
    });
  }

  update(user: UserModel){
    this.id = JSON.parse(String(localStorage.getItem('id')));
    this.userService.update(this.id, user).subscribe(() => {
      this.form.reset();
      this.close()
    });
  }

  close(){
    localStorage.removeItem('id');
    this.route.navigate(['dashboard/user']);
  }

  onSubmit() {
    if (this.id) {
      this.update(this.form.value);
    } else {
      this.create(this.form.value);
    }
  }

}
