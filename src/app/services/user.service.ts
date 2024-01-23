import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'env';
import { UpdateUserDto, UserModel } from '../models/user.model';
import { ServerResponse } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class UsersHttpService {
  API_URL = `${environment.API_URL}/users`;

  constructor(private httpClient: HttpClient) {
  }

  create(payload: any): Observable<any> {
    const url = `${this.API_URL}`;

    return this.httpClient.post<any>(url, payload).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  findAll(): Observable<any> {
    const url = this.API_URL;

    const headers = new HttpHeaders().append('pagination', 'true');

    return this.httpClient.get<any>(url, {headers}).pipe(
      map((response) => {
        return response;
      })
    );
  }

  findOne(id: string): Observable<UserModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  update(id: string, payload: UpdateUserDto): Observable<UserModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map(response => {
        return response.data;
      })
    );
  }

//   reactivate(id: string): Observable<UserModel> {
//     const url = `${this.API_URL}/${id}/reactivate`;

//     return this.httpClient.put<ServerResponse>(url, null).pipe(
//       map((response) => {
//         this.messageService.success(response);
//         return response.data;
//       })
//     );
//   }

//   remove(id: string): Observable<UserModel> {
//     const url = `${this.API_URL}/${id}`;

//     return this.httpClient.delete<ServerResponse>(url).pipe(
//       map((response) => {
//         this.messageService.success(response);
//         return response.data;
//       })
//     );
//   }

//   removeAll(users: UserModel[]): Observable<UserModel[]> {
//     const url = `${this.API_URL}/remove-all`;

//     return this.httpClient.patch<ServerResponse>(url, users).pipe(
//       map((response) => {
//         this.messageService.success(response);
//         return response.data;
//       })
//     );
//   }

//   suspend(id: string): Observable<UserModel> {
//     const url = `${this.API_URL}/${id}/suspend`;

//     return this.httpClient.put<ServerResponse>(url, null).pipe(
//       map((response) => {
//         this.messageService.success(response);
//         return response.data;
//       })
//     );
//   }
}