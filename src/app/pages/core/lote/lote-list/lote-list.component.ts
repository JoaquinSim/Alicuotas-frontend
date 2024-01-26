import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoteModel } from 'src/app/models/lote.model';
import { LoteService } from 'src/app/services/lote.service';
import { TimeService } from 'src/app/services/time.service';
import { UsersHttpService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lote-list',
  templateUrl: './lote-list.component.html',
  styleUrls: ['./lote-list.component.css']
})
export class LoteListComponent implements OnInit{
  protected lote: LoteModel[] = []
  protected user: any[] = []
  protected time:any[] = []
  constructor(private loteService: LoteService,
    private userService: UsersHttpService, private timeService: TimeService, private route: Router){

  }
  ngOnInit(): void {
    this.findAll()
  }


 findAll(){
  this.loteService.findAll().subscribe((response)=>{
    this.lote = response.data;
    console.log(this.lote)
  })
 }

 findUser(){
  this.userService.findAll().subscribe((res) =>{
    this.user = res.data
  })
 }

 findTime(){
  this.timeService.findAll().subscribe((res) =>{
    this.time = res.data;
  });
 }

 crear(){
  this.route.navigate(['dashboard/lote/form']);
}

updateLote(id: string){
  localStorage.setItem(
    'id',
    JSON.stringify(id)
  );
  this.route.navigate(['dashboard/lote/form']);
}

deleteLote(id: string){
  Swal.fire({
    title: 'Eliminar lote?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    denyButtonText: `Cancelar`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      console.log(id)
      this.loteService.remove(id).subscribe(() =>{
        Swal.fire("Eliminado!", "", "success");
        window.location.reload();
      })
    } else if (result.isDenied) {
      Swal.fire('Cancelado', '', 'info');
    }
  });
}
}
