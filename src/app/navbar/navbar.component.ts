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
  today=new Date();


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
      this.wrongDates();
    }
    if(Date.parse(this.dateMin)>Date.parse(this.today)||this.dateMax>this.today){
      console.log('plop');
      this.FuturDates();
    }
    this.datesServices.addDate(this.dateMax, this.dateMin);
  }

  wrongDates(){
    this.dateMax=new Date();
    this.dateMin=new Date();
    this.creatingDateOneMonthMinus(this.dateMin);
    console.log('wrong Date!!');

  }
  FuturDates(){
    this.dateMax=new Date();
    this.dateMin=new Date();
    this.creatingDateOneMonthMinus(this.dateMin);
    console.log('In the futur ??!!');

  }

  creatingDateOneMonthMinus(date:Date){
    let month = date.getMonth();
    month --;
    date.setMonth(month);
    return date;
  }

}
