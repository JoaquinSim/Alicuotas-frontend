import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { environment } from 'env';

@Injectable({
  providedIn: 'root'
})


export class AuthHttpService {
  API_URL: string = `127.0.0.1:3000/ap1/v1/auth`;

  constructor(private readonly httpClient: HttpClient,
              private readonly router: Router,) {
  }

  login(credentials: any): Observable<ServerResponse> {
    const url = `${environment.API_URL}/auth/login`;

    // this.findCatalogues();
    // this.findLocations();

    return this.httpClient.post<ServerResponse>(url, credentials)
      .pipe(
        map(response => {
        //   this.authService.token = response.data.accessToken;
        //   this.authService.auth = response.data.user;
        //   this.authService.roles = response.data.user.roles;
        //   this.institutionsService.institutions = response.data.user.institutions;
        //   this.careersService.careers = response.data.user.careers;
        //   this.schoolPeriodsService.openSchoolPeriod = response.data.schoolPeriod;
        console.log(response)
          return response;
        })
      );
  }
}

export interface ServerResponse {
    data: any;
    error?: string;
    message: string;
    statusCode: number;
    title: string;
    version?: string;
  }
  
  export interface ServerResponsePaginator extends ServerResponse {
    links?: Links;
  }
  
  interface Links {
    first: string;
    last: string;
    prev: string;
    next: string;
  }