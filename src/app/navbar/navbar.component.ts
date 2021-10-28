import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output()startDateHeader:any;
  @Output()endDateHeader:any;


  constructor() { }

  ngOnInit(): void {
    this.startDateHeader='yop yop';
  }

}
