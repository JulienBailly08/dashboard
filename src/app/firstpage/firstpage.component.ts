import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css']
})
export class FirstpageComponent implements OnInit {

  response:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    /*this.http.get<any>("http://localhost:8000/api/users/").subscribe(data=>{
      this.response = data['hydra:member'];
    });*/
    this.http.get<any>('http://127.0.0.1:8000/api/users.json').subscribe(
      data => { this.response = data },
      error => { console.log(error.status) }
    );

  }

}
