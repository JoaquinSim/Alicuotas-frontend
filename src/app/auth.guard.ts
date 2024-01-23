import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const token =  JSON.parse(String(sessionStorage.getItem('accessToken')));
    ;
    if (token) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}