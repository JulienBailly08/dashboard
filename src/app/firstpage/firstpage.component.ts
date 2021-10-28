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
export class FirstpageComponent implements OnInit, OnDestroy {

  users!:any;
  orders!:any;
  userSub!:Subscription;
  orderSub !:Subscription;

  startDate: any;
  endDate: any;


  constructor(  private userService:UsersService,
                private orderService:OrdersService,
                ) { }

  ngOnInit(): void {

    this.userSub = this.userService.getUsers().subscribe(
      (response: Response)=>{
        this.users=response['hydra:member'];
      },
      (error)=>{
        console.log(error);
      }
    );

    this.orderSub = this.orderService.getOrders().subscribe(
      (response:Response)=>{
        this.orders=response['hydra:member'];
      },
      (error)=>{
        console.log(error);
      }
    );


  }



  ngOnDestroy():void{
    this.userSub.unsubscribe;
    this.orderSub.unsubscribe;
  }
}


