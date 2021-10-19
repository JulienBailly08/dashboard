import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/app/models/response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = `${environment.api + 'users'}`;

  constructor(private http: HttpClient) {
  }

  getUsers() : Observable < Response > {
    return this.http.get<Response>(this.baseUrl);
  }
}
