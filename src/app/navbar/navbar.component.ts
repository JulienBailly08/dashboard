import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatesService } from '../services/dates.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  dateMax:any=new Date();
  dateMin:any=new Date();
  today=new Date();
  affichage!:string;



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
    console.log(this.dateMin);
    if(Date.parse(this.dateMin)>Date.parse(this.dateMax)){
      this.wrongDates();
    }
    else if(Date.parse(this.dateMin)>this.today.getTime()||Date.parse(this.dateMax)>this.today.getTime()){
      this.FuturDates();
    }
    else{
      this.datesServices.addDate(this.dateMax, this.dateMin);
    }

  }

  wrongDates(){
    this.dateMax=new Date();
    this.dateMin=new Date();
    this.creatingDateOneMonthMinus(this.dateMin);

    this.affichage='Date de début plus récente que date de fin';
    setTimeout(() => {
      this.affichage='';
    }, 2500);

    this.datesServices.addDate(this.dateMax, this.dateMin);

  }
  FuturDates(){
    this.dateMax=new Date();
    this.dateMin=new Date();
    this.creatingDateOneMonthMinus(this.dateMin);

    this.affichage='Hummm le futur ne peut être connu que par les initiés';
    setTimeout(() => {
      this.affichage='';
    }, 2500);

    this.datesServices.addDate(this.dateMax, this.dateMin);

  }

  creatingDateOneMonthMinus(date:Date){
    let month = date.getMonth();
    month --;
    date.setMonth(month);
    return date;
  }

}
