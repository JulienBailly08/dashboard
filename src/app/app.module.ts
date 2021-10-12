import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { FooterComponent } from './footer/footer.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { SecondpageComponent } from './secondpage/secondpage.component';
import { ThirdpageComponent } from './thirdpage/thirdpage.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';

import { ChartModule } from 'angular2-chartjs';
import { TestComponent } from './charts/test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidepanelComponent,
    FooterComponent,
    FirstpageComponent,
    SecondpageComponent,
    ThirdpageComponent,
    FourOhFourComponent,
    HomePageComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
