import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Message, PrimeIcons } from 'primeng/api';
import { AuthHttpService } from 'src/app/services/login.service';
import Swal from 'sweetalert2'
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent {
  messages: Message[] | any;
  protected readonly PrimeIcons = PrimeIcons;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authHttpService: AuthHttpService,
     private route: Router )

  {
    this.form = this.newForm();
    this.messages = [
      {
        severity: 'error',
        summary: 'Error',
        detail: 'Closable Message Content',
      },
    ];
  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      // username: ['reviewer', [Validators.required]],
      email: [null, [Validators.required]],
      // password: ['12345678', [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.login();
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Verifique todos los campos',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  }

  login() {
    this.authHttpService.login(this.form.value).subscribe((response) => {
      console.log(response);
      sessionStorage.setItem(
        'accessToken',
        JSON.stringify(response.data.accessToken)
      );
    });
    this.route.navigate(['/ali']);
  }

  /** Getters **/
  get emailField(): AbstractControl {
    return this.form.controls['email'];
  }

  get passwordField(): AbstractControl {
    return this.form.controls['password'];
  }
}
