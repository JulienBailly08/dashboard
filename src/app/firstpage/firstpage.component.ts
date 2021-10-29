import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../services/users.service';
import { Response } from 'src/app/models/response';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css']
})
export class FirstpageComponent implements OnInit {



  startDate: any;
  endDate: any;


  constructor( ) { }

  ngOnInit(): void {


  }


}


