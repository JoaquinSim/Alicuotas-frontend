import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/login/auth.component';
import { UserListComponent } from './pages/auth/user/user-list/user-list.component';
import { LoteListComponent } from './pages/core/lote/lote-list/lote-list.component';
import { AlicuotaListComponent } from './pages/core/alicuota/alicuota-list/alicuota-list.component';
import { DashboardComponent } from './pages/core/dashboard/dashboard.component';

const routes: Routes = [
  {path:'' , component: AuthComponent},
  {path:'dashboard' , component: DashboardComponent},
  {path:'dashboard/user' , component: UserListComponent},
  {path:'dashboard/lote' , component: LoteListComponent},
  {path:'dashboard/ali' , component: AlicuotaListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
