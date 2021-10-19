import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/app/models/response';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = `${environment.api + 'orders'}`;

  constructor(private http: HttpClient) {
  }

  getOrders() : Observable < Response > {
    return this.http.get<Response>(this.baseUrl);
  }
}
