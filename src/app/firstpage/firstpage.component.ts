import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../services/users.service';
import { Response } from 'src/app/models/response';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css']
})
export class FirstpageComponent implements OnInit, OnDestroy {

  //response:any;
  users!:any;
  userSub!:Subscription ;

  constructor(private http:HttpClient, private userService:UsersService) { }

  ngOnInit(): void {
    /*this.http.get<any>('http://127.0.0.1:8000/api/users.json').subscribe(
      data => { this.response = data },
      error => { console.log(error.status) }
    );*/
    this.userSub = this.userService.getUsers().subscribe(
      (response: Response)=>{
        this.users=response['hydra:member'];
      },
      (error)=>{
        console.log(error);
      }
    );


  }
  ngOnDestroy():void{
    this.userSub.unsubscribe;
  }

}
