import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { UsersHttpService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  protected users: UserModel[] = [];
  protected state: any;
 u:any;
  protected search: FormControl = new FormControl('');
  constructor(private userService: UsersHttpService,
){

  }
  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this.userService.findAll()
      .subscribe((response) => {
        this.users = response.data;  
      });
  }

}
