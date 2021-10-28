import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/app/models/response';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  private baseUrl = `${environment.api + 'order_details'}`;

  constructor(private http: HttpClient) {}

    getOrderDetails() : Observable < Response > {

      return this.http.get<Response>(this.baseUrl);
    }

}


