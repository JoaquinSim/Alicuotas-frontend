import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from "primeng/dialog";
import {ProgressBarModule} from "primeng/progressbar";
import {DividerModule} from "primeng/divider";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {MegaMenuModule} from "primeng/megamenu";
import {DropdownModule} from "primeng/dropdown";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {RippleModule} from "primeng/ripple";
import {AvatarModule} from "primeng/avatar";
import {FileUploadModule} from "primeng/fileupload";
import {InputTextModule} from "primeng/inputtext";
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { AuthModule } from './pages/auth/auth.module';
import { AlicuotaListComponent } from './pages/core/alicuota/alicuota-list/alicuota-list.component';
import { AlicuotaFormComponent } from './pages/core/alicuota/alicuota-form/alicuota-form.component';
import { LoteFormComponent } from './pages/core/lote/lote-form/lote-form.component';
import { LoteListComponent } from './pages/core/lote/lote-list/lote-list.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TableModule } from 'primeng/table';
import { DashboardComponent } from './pages/core/dashboard/dashboard.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    AppComponent,
    AlicuotaListComponent,
    AlicuotaFormComponent,
    LoteFormComponent,
    LoteListComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    FullCalendarModule,
    HttpClientModule,
    BreadcrumbModule,
    MenubarModule,
    ButtonModule,
    DialogModule,
    ProgressBarModule,
    DividerModule,
    ToastModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    MegaMenuModule,
    DropdownModule,
    OverlayPanelModule,
    RippleModule,
    AvatarModule,
    FileUploadModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    MessagesModule,
    TableModule,
    PanelMenuModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
