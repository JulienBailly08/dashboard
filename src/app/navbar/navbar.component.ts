import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatesService } from '../services/dates.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  dateMax=new Date();
  dateMin=new Date();


  dateForm!:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private datesServices:DatesService) { }

  ngOnInit(): void {
    this.createForm();
    this.creatingDateOneMonthMinus(this.dateMin);
    this.datesServices.addDate( this.dateMax, this.dateMin );
  }

  createForm(){
    this.dateForm = this.formBuilder.group({
      dateMin:['',Validators.required],
      dateMax:['',Validators.required]
    });
  }

  getdates(){
    const formValue = this.dateForm.value;
    this.dateMin=formValue.dateMin;
    this.dateMax=formValue.dateMax;

    if(this.dateMin>this.dateMax){
      this.dateMax=new Date();
      this.creatingDateOneMonthMinus(this.dateMin);
    }
    this.datesServices.addDate(this.dateMax, this.dateMin);
  }

  creatingDateOneMonthMinus(date:Date){
    let month = date.getMonth();
    month --;
    date.setMonth(month);
    return date;
  }

}
