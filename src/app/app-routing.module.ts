import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/login/auth.component';
import { UserListComponent } from './pages/auth/user/user-list/user-list.component';
import { LoteListComponent } from './pages/core/lote/lote-list/lote-list.component';
import { AlicuotaListComponent } from './pages/core/alicuota/alicuota-list/alicuota-list.component';
import { DashboardComponent } from './pages/core/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { UserFormComponent } from './pages/auth/user/user-form/user-form.component';
import { AlicuotaFormComponent } from './pages/core/alicuota/alicuota-form/alicuota-form.component';
import { LoteFormComponent } from './pages/core/lote/lote-form/lote-form.component';

const routes: Routes = [
  {path:'' , component: AuthComponent},
  {path:'dashboard' , component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'dashboard/user' , component: UserListComponent, canActivate: [AuthGuard]},
  {path:'dashboard/user/form' , component: UserFormComponent, canActivate: [AuthGuard]},
  {path:'dashboard/lote' , component: LoteListComponent, canActivate: [AuthGuard]},
  {path:'dashboard/lote/form' , component: LoteFormComponent, canActivate: [AuthGuard]},
  {path:'dashboard/ali' , component: AlicuotaListComponent, canActivate: [AuthGuard]},
  {path:'dashboard/ali/form' , component: AlicuotaFormComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
