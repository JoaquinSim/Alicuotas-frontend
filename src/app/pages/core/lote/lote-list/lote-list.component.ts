import { Component, OnInit } from '@angular/core';
import { LoteService } from 'src/app/services/lote.service';
import { TimeService } from 'src/app/services/time.service';
import { UsersHttpService } from 'src/app/services/user.service';


@Component({
  selector: 'app-lote-list',
  templateUrl: './lote-list.component.html',
  styleUrls: ['./lote-list.component.css']
})
export class LoteListComponent implements OnInit{
  protected lote: any[] = []
  protected user: any[] = []
  protected time:any[] = []
  constructor(private loteService: LoteService,
    private userService: UsersHttpService, private timeService: TimeService){

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
}
