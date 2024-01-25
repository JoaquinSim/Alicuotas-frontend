import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UsersHttpService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


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
  constructor(private userService: UsersHttpService, private router: Router,
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

  updateUser(id: string){
    localStorage.setItem(
      'id',
      JSON.stringify(id)
    );
    this.router.navigate(['dashboard/user/form']);
  }

  deleteUser(id: string){
    Swal.fire({
      title: "Esta seguro de eliminar este usuario",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.userService.remove(id).subscribe(() =>{
          Swal.fire("Eliminado!", "", "success");
          window.location.reload();
        })
      } else if (result.isDenied) {
        Swal.fire("Cancelado", "", "info");
      }
    });
  
  }

  crear(){
    this.router.navigate(['dashboard/user/form']);
  }

  
  cerrarSesion(){
    localStorage.removeItem('id');
    this.router.navigate(['']);
  }
}
