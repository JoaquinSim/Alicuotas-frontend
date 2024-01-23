import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
;
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
import { AuthComponent } from './login/auth.component';
import { CardModule } from 'primeng/card';
import { UserModule } from './user/user.module';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UserModule,
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
    CardModule,
    ButtonModule,
    PasswordModule
  ],
  providers: [],
  bootstrap: [AuthComponent]
})
export class AuthModule { }
